import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"


class EventsService {
  async getAll(query = {}) {
    const res = await api.get('api/events')
    console.log(res.data)
    AppState.events = res.data
  }

  async getOne(eventId) {
    if (!eventId) {
      return
    }
    const res = await api.get(`api/events/${eventId}`)
    console.log(res.data)
  AppState.activeEvent = res.data
  }

  async getTicketsByEvent(eventId) {
    if (!eventId) {
      return
    }
    const res = await api.get(`api/events/${eventId}/tickets`)
    console.log('tickets',res.data)
    AppState.activeTickets = res.data
    return res.data
  }

  async getEventsByAccount(accountId) {
    if (!accountId) {
      return true
    }
    const res = await api.get(`account/tickets`)
    console.log('-getEventsByAccount-', res.data)
    AppState.events = res.data.map(x => x.event)
    AppState.activeTickets = res.data
    return res.data
  }

  async getCommentsByEvent(eventId) {
    if (!eventId) {
      return
    }
    const res = await api.get(`api/events/${eventId}/comments`)
    console.log('-comments-', res.data)
    AppState.comments = res.data
  }

  async attendEvent(eventId, accountId) {
    const tickets = await this.getEventsByAccount(accountId)
    let found = tickets?.find(x => x.eventId == eventId)
    console.log(tickets, found, eventId) 
  if (found?.eventId != undefined) {
    
    return Pop.toast('You Already Have a Ticket', 'error')
  }
  this.getTicketsByEvent(eventId)
  const res = await api.post(`api/tickets`,  {eventId, accountId})
  console.log('-attendEvent-', res.data); 
  AppState.activeTickets = [res.data, ...AppState.activeTickets]
  AppState.activeEvent.capacity -= 1
    
  }

  async createEvent(eventData, accountId) {
    eventData.creatorId = accountId

    const res = await api.post(`api/events`, eventData)
    console.log('-createEvent-',res.data)
    AppState.events = [res.data, ...AppState.events]
    return res.data.id
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    console.log(res.data)
    const event = AppState.events.find(x => x.id == eventId)
    event.isCancelled = true
  }

  async removeTicket(eventId, accountId) {
    const tickets = await this.getTicketsByEvent(eventId)

    console.log(tickets)
    let foundTicket = tickets.find(x => x.accountId == accountId)

    if(!foundTicket) {
      return
    }


    const res = await api.delete(`api/tickets/${foundTicket.id}`)
    console.log('-deleting ticket-', res.data)
    AppState.activeTickets = AppState.activeTickets.filter(x => x.id != foundTicket.id)

  }
}

export const eventsService = new EventsService()