import {Schema, model } from 'mongoose'

const COLLECTION_NAME = 'Practices'

const practiceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lessonId: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    score: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
},  {
    timestamps: true,
    collection: COLLECTION_NAME
})

export default model('Practice', practiceSchema)