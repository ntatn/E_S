import express from 'express'
import topicController from '../../controllers/topic.controller.js'
import { asyncHandler } from '../../helpers/asyncHandler.js'
import { authentication } from '../../auth/authUtils.js'
const router = express.Router()
router.get('/', asyncHandler(topicController.findAllTopic))
router.get('/lesson', asyncHandler(topicController.findAllLessons))
router.get('/:id', asyncHandler(topicController.findOneTopic))
router.post('/', asyncHandler(topicController.createNewTopic))
router.patch('/:id', asyncHandler(topicController.updateOneTopic))
router.delete('/:id', asyncHandler(topicController.deleteOneTopic))

router.use(authentication)

router.get('/lesson/:id', asyncHandler(topicController.findOneLesson))
router.post('/lesson/:id', asyncHandler(topicController.createLesson))


export default router