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
      msg: 'Teste Venturus'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>