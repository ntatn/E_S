import express from 'express'
import accessController from '../../controllers/access.controller.js'
import { asyncHandler } from '../../helpers/asyncHandler.js'
import { authentication } from '../../auth/authUtils.js'
const router = express.Router()

//signUp
router.post('/signup', asyncHandler(accessController.signUp))
router.post('/login', asyncHandler(accessController.login))

router.use(authentication)
router.get('', asyncHandler(accessController.getUser))
router.post('/logout', asyncHandler(accessController.logout))
router.post('/refresh', asyncHandler(accessController.handleRefreshToken))
router.patch('/update', asyncHandler(accessController.updateUser))
export default router