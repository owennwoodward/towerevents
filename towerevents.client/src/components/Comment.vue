<template lang="">
  <div class="elevation-2 border border-secondary my-2 mx-1 rounded bg-white">
    <div class="d-flex">
      <Creator :creator="comment.creator"/>
      <span class="my-4 px-3 align-middle fw-bold">{{comment.creator.name}}</span>
    </div>

    <div class="d-flex justify-content-between">
      <div class="p-2">
        {{comment.body}}
        </div>

      <div class="d-flex">
        <p class="my-3">{{new Date(comment.createdAt).toLocaleDateString()}}</p>
        <div @click="removeComment" title="Remove comment" v-if="account.id == comment.creatorId" class="btn btn-danger m-2"> Remove Comment</div>
      </div>

      </div>

  </div>
</template>
<script>
import { computed } from "vue"
import { AppState } from "../AppState"
import { commentsService } from "../services/CommentsService"
import Pop from "../utils/Pop"

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  setup(props) {


    return {
      account: computed(()=> AppState.account),

      async removeComment() {
        // console.log('--comment',props.comment.id)
        try {
          await commentsService.removeComment(props.comment.id)
          Pop.toast('Deleted Comment')
        } catch (error) {
          console.error(error)
          Pop.toast(error, 'error')
        }
      }
    }
  }
  
}
</script>
<style lang="">
  
</style>