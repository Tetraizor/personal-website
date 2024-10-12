<template>
  <router-view />
</template>

<script lang="ts">
import MainView from "./views/MainView.vue";
import ConstructionView from "./views/ConstructionView.vue";

export default {
  name: "App",
  props: [],
  components: {
    MainView,
    ConstructionView,
  },
};
</script>

<style scoped>
body {
  width: 100%;
  height: 100%;
}
</style>
