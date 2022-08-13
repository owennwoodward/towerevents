import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
    body: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})