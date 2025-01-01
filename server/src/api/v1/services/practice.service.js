import practiceModel from "../models/practiceModel.js";
import { BadRequestError } from "../middlewares/error.response.js";
import { CREATED } from "../middlewares/success.response.js";
import { getIntoData } from "../utils/index.js";
import { AssemblyAI } from "assemblyai";
import "dotenv/config";

class PracticeService {
    static transcriptionText = async (sample, trans) => {
        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLYAI_API_KEY,
        });

        const data = {
            audio: trans.path,
        };
        const transcript = await client.transcripts.transcribe(data)
        
        const highLight = []
        const wordArray = await sample
            .toLowerCase()
            .replace(/[.,?!]/g, "")
            .split(/\s+/)
        const wordArrayOriginal = await sample.split(/\s+/)
        const words = transcript.words
        let totalConfidence = 0
        let currentIndex = 0
        wordArray.map((word) => {
            
            if( words[currentIndex] === undefined){
                highLight.push({ word: wordArrayOriginal[currentIndex], level: "level-1" })
                currentIndex++;
            }
            else if (
                word === words[currentIndex].text.toLowerCase().replace(/[.,?!]/g, "")
            ) {
                if (words[currentIndex].confidence < 0.5) {
                    
                    highLight.push({ word: wordArrayOriginal[currentIndex], level: "level-1" })
                    totalConfidence += words[currentIndex].confidence;
                } else if (words[currentIndex].confidence > 0.75) {
                    highLight.push({ word: wordArrayOriginal[currentIndex], level: "level-3" })
                    totalConfidence += words[currentIndex].confidence;
                } else {
                    highLight.push({ word: wordArrayOriginal[currentIndex], level: "level-2" })
                    totalConfidence += words[currentIndex].confidence;
                }
                currentIndex++;
            } else {
                highLight.push({ word: wordArrayOriginal[currentIndex], level: "level-1" })
                currentIndex++;
            }
        })
        const averageConfidence = totalConfidence / words.length
        if (averageConfidence === null) {
            averageConfidence = 0;
        }
        
        return new CREATED({
            metadata: {
                score: averageConfidence,
                highLight,
            },
        })

    }
    static createPractice = async (lessonId, userId, { score, time }) => {
        const foundLesson = await practiceModel
            .findOne({ lessonId: lessonId, userId: userId })
            .lean()
        if (foundLesson) {
            const filter = { lessonId: lessonId, userId: userId },
                update = {
                    score,
                    time,
                },
                options = { new: true, upsert: true }
            const updatePractice = await practiceModel.findOneAndUpdate(
                filter,
                update,
                options
            )
            return updatePractice
        }
        if (!foundLesson) {
            return await practiceModel.create({
                userId: userId,
                lessonId: lessonId,
                score,
                time,
            })
        }
    }
    static findPractice = async (lessonId, userId) => {
        try {
            const selectedLesson = await practiceModel.findOne({
                lessonId: lessonId,
                userId: userId,
            });
            return getIntoData({ fileds: ["score", "time"], object: selectedLesson })
        } catch (err) {
            throw new BadRequestError(err)
        }
    }
}

export default PracticeService
