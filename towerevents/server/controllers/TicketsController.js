import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsservice } from "../services/TicketsService";
import BaseController from "../utils/BaseController";



export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.delete)
    }
    async delete(req, res, next) {
        try {
            const message = await ticketsservice.delete(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsservice.create(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}