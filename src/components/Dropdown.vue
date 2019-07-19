<template>
  <div class="dropdown">
    <span v-on:click="toggle('ranking')" v-bind:class="{'open' : dropDowns.ranking.open}">
      <span>Jason Bourne</span>
      <div class="dropdown-content">
        <ul>
          <li>
            <a href="javascript:void(0);">Friends List</a>
          </li>
          <li>
            <a href="javascript:void(0);">Saved List</a>
          </li>
          <li>
            <a href="javascript:void(0);">Notifications</a>
          </li>
          <li>
            <a href="javascript:void(0);">User Preferences</a>
          </li>
          <li>
            <a href="javascript:void(0);">Logout</a>
          </li>
        </ul>
      </div>
    </span>
  </div>
</template>
<script>
export default {
  name: "dropdown",
  ready: function() {
    var self = this;
    window.addEventListener(
      "click",
      function(e) {
        if (!e.target.parentNode.classList.contains("menu__link--toggle")) {
          self.close();
        }
      },
      false
    );
  },
  data: function() {
    return {
      dropDowns: {
        ranking: { open: false }
      }
    };
  },
  methods: {
    toggle: function(dropdownName) {
      this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/dropdown";
</style>


