import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { api } from "./AxiosService"


class CommentsService {

   async postComment(commentData) {
    const res = await api.post(`api/comments`, commentData)
    console.log('-PostCOmment-', res.data)
    AppState.comments = [res.data, ...AppState.comments]
  }

  async removeComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(x => x.id != commentId)
  }
}

export const commentsService = new CommentsService()