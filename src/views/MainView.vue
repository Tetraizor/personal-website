<template>
  <div class="mainWrapper">
    <PageViewer
      :selectedIndex="selectedIndex"
      @onBeingAnimatedStateChanged="
        (state) => {
          this.isPageViewerBeingAnimated = state;
        }
      "
      @onPageCollapsed="onPageCollapsed"
    />
    <Sidebar
      :selectedIndex="selectedIndex"
      :isPageViewerBeingAnimated="isPageViewerBeingAnimated"
      @onPageSelectCallback="onPageSelect"
    />
  </div>
</template>

<script>
import Sidebar from "../components/main/sidebar/Sidebar.vue";
import PageViewer from "./Main/PageViewer.vue";

export default {
  name: "MainView",
  props: [],
  components: {
    Sidebar,
    PageViewer,
  },

  data() {
    return {
      selectedIndex: 0,
      isPageViewerBeingAnimated: false,

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
    };
  },

  methods: {
    onPageSelect(index) {
      this.selectedIndex = index;
    },

    onPageCollapsed() {
      const routePath = this.pages[this.selectedIndex].route || "/";
      this.$router.push(routePath);
    },
  },
};
</script>

<style scoped lang="scss">
.mainWrapper {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
}
</style>
