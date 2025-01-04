import topic from '../models/topicModel.js'
import { BadRequestError } from '../middlewares/error.response.js'
import {Types} from "mongoose"

class TopicService {

    static createTopics = async ({title, description, thumb}) =>{
        const hasTopic = await topic.findOne({ title }).lean()
        if(hasTopic){
            throw new BadRequestError('Topic already exists')
        }
        const newTopic = await topic.create({
            title, description, thumb
        })
        return newTopic
    }

    static findByTopicId = async (topicId) =>{
        return await topic.findOne({_id: new Types.ObjectId(topicId) }).lean()
    }

    static getAllTopics = async () =>{
        const allTopics = await topic.find()
        return allTopics
    }

    static updateTopic = async (topicId, bodyUpdate) => {
        await topic.findByIdAndUpdate({_id: new Types.ObjectId(topicId)})
    }

    static removeTopic = async (topicId) => {
        await topic.findByIdAndDelete({_id: new Types.ObjectId(topicId)})
    }
}

export default TopicService