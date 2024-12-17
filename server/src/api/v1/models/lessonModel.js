import { Schema, model } from 'mongoose'

const COLLECTION_NAME = 'Lessons'

const lessonSchema = new Schema({
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
    count: {
        type: Number,
        required: true
    },
    contents: {
        type: Array,
        default: [
            {
                tag: {
                    type: Number,
                    required: true
                },
                question: {
                    type: String,
                    default: ''
                },
                correctSentence: {
                    type: String,
                    default: ''
                },
                translate: {
                    type: String,
                    default: ''
                },
                audioUrl: {
                    type: String,
                    default: ''
                }
            }
        ]
    }

},  {
    timestamps: true,
    collection: COLLECTION_NAME
})

export default model('Lesson', lessonSchema)
