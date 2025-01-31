import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import keyTokenService from "./keyToken.service.js";
import { createTokenPair, verifyJWT } from "../auth/authUtils.js";
import { getIntoData } from "../utils/index.js";
import { CREATED } from "../middlewares/success.response.js";
import {
  BadRequestError,
  ForbiddenError,
  AuthFailureError,
} from "../middlewares/error.response.js";
import { findByEmail } from "./user.service.js";

class AccessService {
  static handleRefreshToken = async (refreshToken) => {
    const foundToken = await keyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      await keyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Something wrong happened !! Please relogin");
    }

    const holderToken = await keyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) throw new AuthFailureError("User not registered 1");
    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey
    );
    const foundUser = await findByEmail(email);

    if (!foundUser)
      throw new AuthFailureError(`User not registered 2 ${foundUser}`);

    const tokens = await createTokenPair(
      { userId, email },
      holderToken.publicKey,
      holderToken.privateKey
    );

    await holderToken.update({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });
    return {
      user: { userId, email },
      tokens,
    };
  };

  static logout = async (keyStore) => {
    const delKey = await keyTokenService.removeKeyById(keyStore._id);
    console.log(delKey);
    return delKey;
  };
  /*
        1 - Check Email in dbs
        2 - Match password
        3 - create AccessToken and RefreshToken and save
        4 - generate
        5 - get data return login
    */
  static login = async ({ email, password, refreshToken = null }) => {
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new BadRequestError("User not registered");

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError("Authentication error");

    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const tokens_ = await createTokenPair(
      { userId: foundUser._id, email },
      publicKey,
      privateKey
    );
    await keyTokenService.createKeyToken({
      userId: foundUser._id,
      refreshToken: tokens_.refreshToken,
      privateKey,
      publicKey,
    });

    return {
      user: getIntoData({
        fileds: ["_id", "name", "status"],
        object: foundUser,
      }),
      token: tokens_,
    };
  };

  static signUp = async ({ name, email, password, level }) => {
      // Check email exists?
      const hodelUser = await user.findOne({ email }).lean();
      if (hodelUser) {
        throw new BadRequestError("Email already exists");
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await user.create({
        name,
        email,
        password: passwordHash,
        level,
      });
      if (newUser) {
        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        console.log({ publicKey, privateKey });

        const keyStore = await keyTokenService.createKeyToken({
          userId: newUser._id,
          privateKey,
          publicKey,
        });
        console.log(keyStore);
        if (!keyStore) {
          return {
            code: "xxxx",
            message: "keystore error",
          };
        }
        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          publicKey,
          privateKey
        );
        console.log(tokens);
        return new CREATED({
          metadata: {
            user: getIntoData({
              fileds: ["_id", "name", "email", "level"],
              object: newUser,
            }),
            tokens,
          },
        });
      }
  };
  //Profile
  static getProfile = async ( userId ) => {
    const foundUser = await user.findOne({ _id: userId }).lean();
    console.log(foundUser)
    if (!foundUser) {
      throw new BadRequestError("User not found at Here");
    }
    if (foundUser) {
      return new CREATED({
        metadata: {
          user: getIntoData({
            fileds: ["name", "email", "level"],
            object: foundUser,
          }),
        },
      });
    }
  };
  static updateProfile = async ( userId , {name, email, level}) => {
    const filter = {_id: userId}, update = {
      name: name, email: email, level: level
    }
    const updatedUser = await user.findOneAndUpdate(filter, update, {new: true})
    return updatedUser
  };
}

export default AccessService;
