<template>
  <div class="mainWrapper">
    <PageViewer @onPageCollapsed="onPageCollapsed" />
    <Sidebar />
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
      pages: [
        {
          name: "me",
          route: "/",
          description: "a little summary about me.",
        },
        {
          name: "games",
          route: "/games",
          description: "a little summary about me.",
        },
        {
          name: "blog",
          route: "/blog",
          description: "a little summary about me.",
        },
        {
          name: "projects",
          route: "/projects",
          description: "a little summary about me.",
        },
      ],

      navigationStore: useNavigationStore(),
      screenStore: useScreenStore(),
    };
  },

  methods: {
    onPageCollapsed() {
      const page = this.pages.find((page) => {
        return page.name === this.navigationStore.page;
      });

      const routePath = page?.route || "/";
      this.$router.push(routePath);
    },
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
};
</script>

<style scoped lang="scss">
.mainWrapper {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
}
</style>
