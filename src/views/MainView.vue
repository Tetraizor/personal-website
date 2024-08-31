<template>
  <div class="mainWrapper">
    <PageViewer ref="pageViewer" />
    <Sidebar ref="sidebar" @sidebarButtonPressed="sidebarButtonPressed" />
  </div>
</template>

<script lang="ts">
import Sidebar from "../components/main/sidebar/Sidebar.vue";
import PageViewer from "./Main/PageViewer.vue";

import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";

export default {
  name: "MainView",
  props: [],
  components: {
    Sidebar,
    PageViewer,
  },

  data() {
    return {
      navigationStore: useNavigationStore(),
      screenStore: useScreenStore(),
    };
  },

  mounted() {
    window.matchMedia("(min-width: 768px)").addEventListener("change", () => {
      this.screenStore.setIsMobile(
        !window.matchMedia("(min-width: 768px)").matches
      );
    });

    this.screenStore.setIsMobile(
      !window.matchMedia("(min-width: 768px)").matches
    );
  },

  methods: {
    sidebarButtonPressed(page: string) {
      const pageViewer = this.$refs.pageViewer as InstanceType<
        typeof PageViewer
      >;
      pageViewer.transitionPageView(page);
    },
  },
};
</script>

<style scoped lang="scss">
.mainWrapper {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
}
</style>
