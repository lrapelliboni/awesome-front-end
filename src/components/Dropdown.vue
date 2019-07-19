<template>
  <div class="dropdown">
    <span v-on:click="toggle('profileMenu')" v-bind:class="{'open' : dropDowns.profileMenu.open}">
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
  data: function() {
    return {
      dropDowns: {
        profileMenu: { open: false }
      }
    };
  },
  mounted() {
    document.addEventListener("click", this.onClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },
  methods: {
    onClick(e) {
      if (!e.target.parentNode.classList.contains("open")) {
        this.dropDowns.profileMenu.open = false;
      }
    },
    toggle: function(dropdownName) {
      this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/dropdown";
</style>


