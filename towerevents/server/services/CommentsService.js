import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class CommentsService {
    async delete(id, userId) {
        const comment = await dbContext.Comment.findById(id)
        if (comment.creatorId.toString() != userId) {
            throw new BadRequest('not yours')
        }
        comment.remove()
        return comment
    }
    async getComments(eventId) {
        const comments = await dbContext.Comment.find({ eventId })
            .populate('creator')
        return comments

    }
    async create(body) {
        let comments = await dbContext.Comment.create(body)
        await comments.populate('creator')
        return comments
    }

}


export const commentsService = new CommentsService