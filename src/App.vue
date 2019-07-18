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
    <!-- <ul>
      <li>
        <router-link to="/">/home</router-link>
      </li>
      <li>
        <router-link to="/users">/users</router-link>
      </li>
      <li>
        <router-link to="/users/new">/users/new</router-link>
      </li>
    </ul>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "./assets/styles/variables";
@import "./assets/styles/bootstrap";
@import "./assets/styles/custom-components";
@import "./assets/styles/app";
</style>
