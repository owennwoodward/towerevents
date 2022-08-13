import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";



export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.delete)
    }
    async delete(req, res, next) {
        try {
            const message = await commentsService.delete(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comments = await commentsService.create(req.body)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}