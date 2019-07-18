<template>
  <div id="app" class="container">
    <header class="header-container">
      <div class="logo-container">
        <div class="logo"></div>
      </div>
      <div class="header-text">
        <span>Venturus Sports</span>
      </div>
    </header>
    <router-view :shared="shared"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      shared: {
        users: [],
        isLoaded: false
      }
    };
  }
};
</script>

<style lang="scss">
@import "./assets/styles/variables";
@import "./assets/styles/bootstrap";
@import "./assets/styles/custom-components";
@import "./assets/styles/app";
</style>
