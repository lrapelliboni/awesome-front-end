<template>
  <div id="app">
    <header class="header-container container">
      <div style="float:left;">
        <div class="logo-container">
          <div class="logo"></div>
        </div>
        <div class="header-text">
          <span>Venturus Sports</span>
        </div>
      </div>
      <Dropdown />
    </header>
    <Breadcrumb />
    <div class="brand-container">
      <div class="brand container">
        <div class="col-md-4 box-info">
          <font-awesome-icon icon="puzzle-piece" />
          <span class="box-text">
            <small>Sport type</small>
            <strong>Cycling</strong>
          </span>
        </div>
        <div class="col-md-4 box-info">
          <font-awesome-icon icon="trophy" />
          <span class="box-text">
            <small>Mode</small>
            <strong>Advanced</strong>
          </span>
        </div>
        <div class="col-md-4 box-info">
          <font-awesome-icon icon="map-signs" />
          <span class="box-text">
            <small>Route</small>
            <strong>30 miles</strong>
          </span>
        </div>
      </div>
    </div>
    <div class="container" style="clear:both;">
      <router-view :shared="shared"></router-view>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb";
import Dropdown from "./components/Dropdown";

export default {
  name: "app",
  data: function() {
    return {
      shared: {
        users: [],
        isLoaded: false
      }
    };
  },
  components: {
    Breadcrumb,
    Dropdown
  }
};
</script>

<style lang="scss">
@import "./assets/styles/variables";
@import "./assets/styles/bootstrap";
@import "./assets/styles/custom-components";
@import "./assets/styles/app";
</style>
