import {SuccessResponse} from "../middlewares/success.response.js"
import PracticeService from "../services/practice.service.js"


class PracticeController {
    translateText = async (req, res, next) => {
        new SuccessResponse({
            message: 'Sample successfully translateed',
            metadata: await PracticeService.transcriptionText(req.body.text, req.file)
        }).send(res)
    }
    createPractice = async (req, res, next) => {
        new SuccessResponse({
            message: 'created successfully',
            metadata: await PracticeService.createPractice(req.params.id, req.headers['x-client-id'], {...req.body})
        }).send(res)
    }
    findPractice = async (req, res, next) => {
        new SuccessResponse({
            message: 'created successfully',
            metadata: await PracticeService.findPractice(req.params.id, req.headers['x-client-id'])
        }).send(res)
    }
    findAllPractices = async (req, res, next) => {
        new SuccessResponse({
            message: 'created successfully',
            metadata: await PracticeService.findAllPractices(req.headers['x-client-id'])
        }).send(res)
    }
}

export default new PracticeController