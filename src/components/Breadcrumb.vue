<template>
  <div class="breadcrumb-container">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        :class="{'linked': !!breadcrumb.link}"
      >
        <a href="javascript:void(0);" @click="routeTo(idx)">{{ breadcrumb.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: []
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    }
  },
  methods: {
    routeTo(idx) {
      if (this.breadcrumbList[idx].link)
        this.$router.push(this.breadcrumbList[idx].link);
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/breadcrumb";
</style>
