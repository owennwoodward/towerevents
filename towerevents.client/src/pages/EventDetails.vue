<template lang="">
  <div class="row p-2">
    <div class="col-12 d-flex flex-column  my-2">
      <div class="over-container d-flex flex-column justify-content-between mb-4" :style="{'background-image': `url(${event.coverImg})`}">
        <!-- <img :src="event.coverImg" alt="Event CoverImage" class="img rounded"/> -->

        <div class="over-top d-flex justify-content-between">
          <h1 class=" p-4 ">{{event.name}}</h1> 
          <div class="d-flex flex-column justify-content-center p-2">
            <div title="Cancel This Event" @click="cancelEvent" v-if="account.id == event.creatorId && event.isCanceled != true" class="btn btn-danger">Cancel this event</div>
            <div title="Attend This Event" @click="attendEvent" v-if="!event.isCanceled && event.capacity != 0 && !isAttending" class="btn btn-warning m-1 border border-secondary">Attend this event</div>
    
          </div>

        </div>
        <div class="over-bottom p-3 d-flex">
          <p class="my-4 px-3 align-middle">{{new Date(event.startDate).toLocaleDateString()}}</p>
          <p class="my-4 px-3 align-middle">Type: {{event.type}}</p>
          <div class="d-flex">
            <p class="my-4 px-3 align-middle">Organized By</p>
            <Creator :creator="event.creator"/>
          </div>
      <p class="my-4 px-3 align-middle">Capacity: {{event.capacity}}</p>
      <p class="my-4 px-3 align-middle">Location: {{event.location}}</p>
      <p class="my-4 px-3 align-middle" v-if="event.isCanceled"> This Event is Cancelled</p>
        </div>
      </div>



      <h2>Description</h2>
      <p>{{event.description}}</p>


      <div v-if="tickets[0] != undefined">
        <h3>Who's Going</h3>
  
        <div class="d-flex">
          <Attendee v-for="t in tickets" :key="t.id" :creator="t" />
        </div>

      </div>


      <div class="my-4">
        <p>Add a comment</p>
        <form @submit.prevent="postComment">
        
        <div class="mb-3">
          <input type="text" v-model="comment.body" class="form-control" name="commentForm" id="commentForm" aria-describedby="helpId" placeholder="Comment text here">
        </div>
        
        </form>
      </div>

      <Comment v-for="c in comments" :key="c.id" :comment="c" />
    </div>
  </div>
</template>
<script>
import { computed, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { commentsService } from '../services/CommentsService'
import Pop from "../utils/Pop"

export default {

  setup() {
    const route = useRoute()
    const comment = ref({ eventId: `${route.params.id}`})
    watchEffect(async () => {
     try {
       await eventsService.getOne(route.params.id)
       await eventsService.getTicketsByEvent(route.params.id)
       await eventsService.getCommentsByEvent(route.params.id)
     } catch (error) {
     Pop.toast(error, 'error')
     console.error(error);
     }
    });

    return {
      comment,
      event: computed(()=> AppState.activeEvent),
      tickets: computed(()=> AppState.activeTickets),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      isAttending: computed(() => {
        const userTicket = AppState.activeTickets.find(x => x.accountId == AppState.account.id)
        if (!userTicket?.id) {
          return false
        }
        return true
      }),
      


      async postComment() {
        console.log(comment.value.body, '-commenting-')
        try {
          await commentsService.postComment(comment.value)
        } catch (error) {
          Pop.toast(error, 'error')
          console.error(error);
        }
      },

      async cancelEvent() {
       try {
         await eventsService.cancelEvent(route.params.id) 
         Pop.toast('Event Cancelled')
       } catch (error) {
       Pop.toast(error, 'error')
       console.error(error);
       }
      },

      async attendEvent() {
       try {
         await eventsService.attendEvent(route.params.id, AppState.account.id)
       } catch (error) {
       Pop.toast(error, 'error')
       console.error(error);
       }
      }
    }
  }
  
}
</script>
<style scoped lang="scss">
.img {
  width: 95vw;
  height: 40vw;
  object-fit: fill;
  position: absolute;
  z-index: 1;

}

.over-container {
  position: relative;
  height: 40vw;
  background-repeat: no-repeat;
  background-size: cover;
  // border-radius: 5%;
  
}

.over-top {
  z-index: 50;
  background-color: rgba(87, 57, 57, 0.347);
  backdrop-filter:blur(5px);
  color: white;
  text-shadow: 1px 1px #252222;
  // border-radius: 5%;


  
}

.over-bottom {
  z-index: 50;
  background-color: rgba(87, 57, 57, 0.347);
  backdrop-filter:blur(5px);
  color: white;
  text-shadow: 2px 2px #252222;
  // border-radius: 5%;


  
}

.shadowkiller {
  
   text-shadow: 0px 0px #25222200 !important;

}
  
</style>