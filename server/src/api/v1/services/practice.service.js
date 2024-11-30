import practiceModel from '../models/practiceModel.js'
import { BadRequestError} from '../middlewares/error.response.js'
import { CREATED } from '../middlewares/success.response.js'
import { AssemblyAI } from 'assemblyai'
import 'dotenv/config'
import  splitText from '../middlewares/translateMiddlewares.js'
class PracticeService {
    
    static transcriptionText = async (sample, trans) => {

            const client = new AssemblyAI({
                apiKey: process.env.ASSEMBLYAI_API_KEY,
            })
            
            const data = {
                audio: trans.path,
            }
            const transcript = await client.transcripts.transcribe(data)
            const highLight = []
            const wordArray = await sample.toLowerCase().replace(/[.,?!]/g, '').split(/\s+/)
            
            const words = transcript.words
            let totalConfidence = 0 
            let currentIndex = 0
                words.map((word) => {
                        if(wordArray[currentIndex] === word.text.toLowerCase().replace(/[.,?!]/g, '')){
                            if(word.confidence < 0.5){
                                highLight.push({word: wordArray[currentIndex], level: 'level-1'})
                                totalConfidence += word.confidence
                            }else if(word.confidence > 0.75){
                                highLight.push({word: wordArray[currentIndex], level: 'level-3'})
                                totalConfidence += word.confidence
                            }else{
                                highLight.push({word: wordArray[currentIndex], level: 'level-2'})
                                totalConfidence += word.confidence
                            }
                            currentIndex++
                        }else{
                            highLight.push({word: wordArray[currentIndex], level: 'level-1'})
                            currentIndex++
                        }
                })
            const averageConfidence = totalConfidence / words.length;
            if(averageConfidence === null) {
                averageConfidence = 0;
            }
            
            return new CREATED ({
                metadata: {
                    score: averageConfidence,
                    highLight
                }
            })
        
    }
    static createPractice = async (lessonId, userId, {score, time}) => {
        const foundLesson = await practiceModel.findOne({lessonId: lessonId}).lean()
        if(foundLesson) {
            const filter = {lessonId: lessonId}, update = {
                    score,
                    time
            }, options = {new: true, upsert: true}
            const updatePractice = await practiceModel.findOneAndUpdate(filter, update, options)
            return updatePractice
        }
        if(!foundLesson) {
            return await practiceModel.create({
                userId: userId,
                lessonId: lessonId,
                score,
                time
            })
        }
    }


}

export default PracticeService 
