<template lang="">
  <div class="my-2 px-2">
    <img class="creator" :src="creator.picture" alt="Creator Picture" :title="creator.name"/>
    <!-- <p class="p-0 m-0">{{creator.name}}</p> -->
  </div>
</template>
<script>
export default {
  props: {
    creator: {
      type: Object,
      required: true
    }
  }
  
}
</script>
<style scoped lang="scss">
  .creator {
    max-height: 5vh;
    border-radius: 50%;
  }
</style>