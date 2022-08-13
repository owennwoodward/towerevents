<template >

  <div class="col-4 event">
    <div :class="event.isCanceled ? 'border border-danger' : ''">
      <div @click="getDetails" class="elevation-2 m-1 selectable">



        <div class="over-container" :style="{ 'background-image': `url(${event.coverImg})` }">
          <!-- <img :src="event.coverImg" alt="Event Cover Image" class="img-fluid rounded"/> -->
          <h3 class="p-3 over-top">{{ event.name }}</h3>

        </div>


        <div class="p-3 ml-4 bottom-text">
          <p v-if="!event.isCanceled">When: {{ new Date(event.startDate).toLocaleDateString() }}</p>
          <p>Where: {{ event.location }}</p>
          <p v-if="event.isCanceled">This Event is Canceled</p>
          <p v-if="!event.isCanceled">{{ event.capacity }} Tickets Available</p>

        </div>

      </div>
      <div class="d-flex flex-column p-1 px-3">
        <div v-if="route.name == 'About' && event.id" @click="removeTicket()" class="btn btn-danger">Remove Ticket
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"


export default {
  props: {
    event: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    let show = false


    return {
      route,
      getDetails() {
        console.log(props.event.id)
        router.push({
          name: 'Event Details',
          params: {
            id: props.event.id
          }
        })
      },
      async removeTicket() {
        try {
          console.log(props.event.id)
          eventsService.removeTicket(props.event.id, AppState.account.id)
          Pop.toast('Deleted Ticket')
          eventsService.getEventsByAccount(AppState.account.id)
        } catch (error) {
          console.error(error)
          Pop.toast(error, 'error')
        }
      }
    }
  }

}
</script>
<style scoped lang="scss">
.event {
  // height: 45vh !important;
}

.over-container {
  position: relative;
  height: 25vw;
  background-repeat: no-repeat;
  background-size: cover;
  // border-radius: 5%;

}

.over-top {
  z-index: 50;
  background-color: rgba(223, 200, 200, 0.347);
  backdrop-filter: blur(5px);
  color: white;
  text-shadow: 1px 1px #252222;
  // border-radius: 5%;



}

.bottom-text {
  font-style: italic;
  background-color: #252222;
  color: white;
  height: 18vh;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>