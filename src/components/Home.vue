<template>
  <div class="home-component">
    <h1>Home</h1>
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Awesome Front-End'
    }
  }
}
</script>
<style scoped>
</style>