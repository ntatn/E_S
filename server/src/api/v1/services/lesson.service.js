import { BadRequestError, ForbiddenError, AuthFailureError } from '../middlewares/error.response.js'
import { CREATED } from '../middlewares/success.response.js'
import lesson from '../models/lessonModel.js'
import { getIntoData } from '../utils/index.js'
class lessonService {
    static createLesson = async (topicId, {tag,  question, correctSentence, translate, audioUrl}) => {
        try { 
            const filter = {topicId: topicId, count: {$lt: 10}}, update = {
                $push: {
                    contents: {
                        tag,
                        question,
                        correctSentence,
                        translate,
                        audioUrl
                    }
                },
                $inc: {count: 1}
            }, options = {new: true, upsert: true}
            const newLesson = await lesson.findOneAndUpdate(filter, update, options)
            return newLesson

        }catch (error) {
            throw new BadRequestError(error)
        }
    }

    static findAllLessons = async (topicId) => {
        return await lesson.find({topicId: topicId}).limit(10).lean()
    }

    static findOneLesson = async (lessonId) => {
        try{
            const selectedLesson = await lesson.findOne({_id: lessonId})
            return getIntoData({fileds: ['contents'], object: selectedLesson})
        }catch(err){
            throw new BadRequestError(err)
        }
    }

}

export default lessonService