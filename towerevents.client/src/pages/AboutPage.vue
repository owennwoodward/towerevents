<template>
  <div class="col-12">
    <h1>Your Account</h1>
    <img :src="account.picture" alt="Account Picture"/>

    <p>Email: {{account.email}}</p>
    <p>Username: {{account.name}}</p>

  </div>

  <div class="row">
    <div class="col-12">
      <h2>Your Tickets</h2>
    </div>

      <Event v-for="e in events" :key="e.id" @click="removeTicket" :event="e"  class=""/>
    <div >

      <!-- <div  class="btn btn-danger"> remove ticket</div> -->
    </div>

  </div>

</template>

<script>
import { computed, nextTick, onMounted, watchEffect } from "vue"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop"

export default {
  name: 'AboutPage',


  setup() {
    watchEffect(async() => {
      try {
        eventsService.getEventsByAccount(AppState.account.id)
      } catch (error) {
        console.error(error)
        Pop.toast(error, 'error')
      }
    });

    return {
      account: computed(()=> AppState.account),
      events: computed(()=> AppState.events),


    }
  }
}
</script>
