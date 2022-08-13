import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const TicketSchema = new Schema({
    eventId: { type: ObjectId, ref: 'TowerEvent', required: true },
    accountId: { type: ObjectId, ref: 'Account', required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})