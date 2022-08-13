<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      Events
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse d-flex align-items-center" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" title="Account Tab"
            class="btn text-success lighten-30 selectable text-uppercase">
            Account
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div class="d-flex ">
        <div v-if="account.id" title="Create An Event" class="btn btn-info m-2" data-bs-toggle="modal"
          data-bs-target="#modelId">Create an Event
        </div>
        <Login />
      </div>
    </div>
  </nav>

  <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <form @submit.prevent="createEvent">
            <h1>Create An Event</h1>

            <div class="mb-3">
              <input type="text" v-model="eventForm.name" required class="form-control" name="eventName" id="eventName"
                aria-describedby="helpId" placeholder="Event Name">
            </div>

            <div class="mb-3">
              <textarea v-model="eventForm.description" required class="form-control" name="description"
                id="description" placeholder="Description" rows="3"></textarea>
            </div>

            <div class="mb-3">
              <input type="text" v-model="eventForm.location" required class="form-control" name="location"
                id="location" aria-describedby="helpId" placeholder="Location">
            </div>

            <div class="mb-3">
              <input type="number" v-model="eventForm.capacity" required class="form-control" name="capacity"
                id="capacity" aria-describedby="helpId" placeholder="capacity">
            </div>

            <div class="mb-3">
              <input type="date" v-model="eventForm.startDate" required class="form-control" name="startDate"
                id="startDate" aria-describedby="helpId" placeholder="startDate">
            </div>

            <div class="mb-3">
              <input type="text" v-model="eventForm.coverImg" required class="form-control" name="coverImg"
                id="coverImg" aria-describedby="helpId" placeholder="coverImg">
            </div>

            <!-- type -->
            <label class="mx-2" for="cars">Choose an event type: </label>
            <select id="cars" name="cars">
              <option value="concert">concert</option>
              <option value="convention">convention</option>
              <option value="sport">sport</option>
              <option value="digital">digital</option>
            </select>
            <br />
            <br />

            <button type="submit" title="Submit form" class="btn btn-primary">Submit</button>




          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, popScopeId, ref } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";

export default {
  setup() {
    const router = useRouter()
    const eventForm = ref({})
    return {
      eventForm,
      account: computed(() => AppState.account),

      async createEvent() {
        console.log(eventForm.value)

        try {
          const newEventId = await eventsService.createEvent(eventForm.value, this.account.id)
          Pop.toast('Created Event')
          router.push({
            name: 'Event Details',
            params: {
              id: newEventId
            }
          })
        } catch (error) {
          console.error(error)
          Pop.toast(error, 'error')
        }

      }
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
