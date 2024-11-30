import {SuccessResponse} from "../middlewares/success.response.js"
import TopicService from "../services/topic.service.js"
import LessonService from "../services/lesson.service.js"
class TopicController {

    createNewTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new topic successfully',
            metadata: await TopicService.createTopics(req.body)
        }).send(res)
    }

    findAllTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'Find all topics successfully',
            metadata: await TopicService.getAllTopics()
        }).send(res)
    }

    findOneTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'Find one topic successfully',
            metadata: await TopicService.findByTopicId(req.params.id)
        }).send(res)
    }

    updateOneTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update topic successfully',
            metadata: await TopicService.updateTopic(req.params.id, {...req.body})
        }).send(res)
    }

    deleteOneTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete topic successfully',
            metadata: await TopicService.removeTopic(req.params.id)
        }).send(res)
    }

    createLesson = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create lesson successfully',
            metadata: await LessonService.createLesson(req.params.id, {...req.body})
        }).send(res)
    }

    findAllLessons = async (req, res, next) => {
        const {topicId} = req.query
        new SuccessResponse({
            message: 'All lesson',
            metadata: await LessonService.findAllLessons(topicId)
        }).send(res)
    }
    findOneLesson = async (req, res, next) => {
        new SuccessResponse({
            message: 'One lesson',
            metadata: await LessonService.findOneLesson(req.params.id)
        }).send(res)
    }
}

export default new TopicController