import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"



class TowerEventsService {
    // async getEvents(id) {

    // }
    async getById(id) {
        let events = await dbContext.TowerEvent.findById(id).populate('creator', 'name picture')
        return events
    }
    async update(id, update) {
        const original = await dbContext.TowerEvent.findById(id).populate('creator', 'name picture')
        if (original.creatorId.toString() != update.creatorId) {
            throw new BadRequest('this is not yours')
        }
        if (original.isCanceled) {
            throw new Forbidden('no')
        }
        original.name = update.name ? update.name : original.name
        original.description = update.description ? update.description : original.description
        original.coverImg = update.coverImg ? update.coverImg : original.coverImg
        original.location = update.location ? update.location : original.location
        original.capacity = update.capacity ? update.capacity : original.capacity
        original.startDate = update.startDate ? update.startDate : original.startDate
        original.isCanceled = update.canceled ? update.canceled : original.isCanceled
        original.type = update.type ? update.type : original.type
        original.save()
        return update
    }
    async delete(id, userId) {
        const project = await dbContext.TowerEvent.findById(id)
        if (project.creatorId.toString() != userId) {
            throw new BadRequest('this is not yours')
        }
        // await dbContext.TowerEvent.deleteMany({ projectId: id })
        project.isCanceled = true
        await project.save()
        return `deleted event ${project.name}`
    }
    async getAll(query = {}) {
        let events = await dbContext.TowerEvent.find(query).populate('creator', 'name picture')
        return events
    }
    async createEvent(body) {
        let events = await dbContext.TowerEvent.create(body)
        await events.populate('creator', 'name picture')
        return events
    }

}


export const towerEventsService = new TowerEventsService