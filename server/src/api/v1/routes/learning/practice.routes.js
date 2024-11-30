import express from 'express'
import practiceController from '../../controllers/practice.controller.js'
import { asyncHandler } from '../../helpers/asyncHandler.js'
import uploadMiddleware from '../../middlewares/uploadMiddleware.js'
import { authentication } from '../../auth/authUtils.js'
const router = express.Router()
router.post('/compare',uploadMiddleware.single('audio'), asyncHandler(practiceController.translateText))

router.use(authentication)
router.post('/:id', asyncHandler(practiceController.createPractice))

export default router