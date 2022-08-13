<template>

  <div class="row my-3">
    <h1 class="p-3 text-center">Events</h1>
    <b>Filter By</b>
    <h4 class="p-2 d-flex">
      <div @click="eventFilter = ''" class="filters bg-white selectable mx-2 border border-secondary p-1 bg-success">All
      </div>
      <div @click="eventFilter = 'concert'"
        class="filters bg-white selectable mx-2 border border-secondary p-1 bg-primary">Concert
      </div>
      <div @click="eventFilter = 'convention'"
        class="filters bg-white selectable mx-2 border border-secondary p-1 bg-info">
        Convention</div>
      <div @click="eventFilter = 'sport'"
        class="filters bg-white selectable mx-2 border border-secondary p-1 bg-warning">Sport
      </div>
      <div @click="eventFilter = 'digital'"
        class="filters bg-white selectable mx-2 border border-secondary p-1 bg-danger">Digital
      </div>
    </h4>

  </div>

  <div class="row">
    <Event v-for="e in events" :key="e.id" :event="e" />



  </div>

</template>

<script>
import { computed, onMounted, ref } from "vue"
import { AppState } from "../AppState"
import { eventsService } from '../services/EventsService'

export default {
  name: 'Home',
  setup() {
    const eventFilter = ref('')
    onMounted(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
        console.error(error);
      }
    })

    return {
      eventFilter,
      events: computed(() => AppState.events.filter(x => eventFilter.value ? x.type == eventFilter.value : true))
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.filters {

  text-align: center;
  width: 20%;
  border-radius: 20px;
}
</style>
