import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"



class TicketsService {
    async delete(id, userId) {
        const ticket = await dbContext.Ticket.findById(id)
        if (ticket.accountId.toString() != userId) {
            throw new BadRequest('this is not yours')
        }
        const events = await dbContext.TowerEvent.findById(ticket.eventId)
        events.capacity++
        events.save()
        ticket.remove()
        return ticket
    }

    async getTickets(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId })
            .populate('account')
        return tickets
    }
    async getAll(accountId) {
        const tickets = await dbContext.Ticket.find({ accountId })
            .populate('event')
        return tickets
    }
    async create(body) {
        const events = await dbContext.TowerEvent.findById(body.eventId)
        if (events.capacity >= 1) {
            let ticket = await dbContext.Ticket.create(body)
            await ticket.populate('account')
            await ticket.populate('event')
            events.capacity = events.capacity - 1
            events.save()
            return ticket
        } else {
            throw new BadRequest('event is full')
        }
    }

}


export const ticketsservice = new TicketsService