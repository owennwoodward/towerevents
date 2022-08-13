<template lang="">
  <div class="att-cont">
    <img class="attendee" :src="creator.account.picture" :title="creator.account.name" alt="Account picture" />
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
<style lang="scss">
  .att-cont {
    max-height: 5vh;
  }

  .attendee {
    border-radius: 50%;
    max-height: 5vh;
  }
</style>