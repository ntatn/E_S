import keyToken from "../models/keyTokenModel.js"
import {Types} from "mongoose"
class keyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken}) => {
        try {
            const filter = {userId: userId}, update = {
                publicKey, privateKey, refreshToken, refreshTokensUsed: []
            }, options = {upsert: true, new: true}
            const tokens = await keyToken.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
        }catch(err) {
            return err
        }
    }

    static findByUserId = async (userId) =>{
        return await keyToken.findOne({ userId: new Types.ObjectId(userId)}).lean()
    }

    static removeKeyById = async ({id}) =>{
        return await keyToken.deleteOne({ _id:  new Types.ObjectId(id)})
    }

    static findByRefreshTokenUsed = async (refreshToken) =>{
        return await keyToken.findOne({ refreshTokensUsed: refreshToken })
    }

    static findByRefreshToken = async (refreshToken) =>{
        return await keyToken.findOne({ refreshToken }).lean()
    }

    static deleteKeyById = async (userId) =>{
        return await keyToken.deleteOne({userId: new Types.ObjectId(userId)})
    }
}

export default keyTokenService