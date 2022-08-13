import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { commentsService } from "../services/CommentsService";
import { ticketsservice } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/tickets', this.getTickets)
            .get('/:id/comments', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:id', this.update)
            .post('', this.createEvent)
            .delete('/:id', this.delete)
    }
    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getTickets(req, res, next) {
        try {
            const tickets = await ticketsservice.getTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const events = await towerEventsService.getById(req.params.id)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const tower = await towerEventsService.update(req.params.id, req.body)
            return res.send(tower)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            const message = await towerEventsService.delete(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await towerEventsService.getAll(req.query)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const events = await towerEventsService.createEvent(req.body)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
}