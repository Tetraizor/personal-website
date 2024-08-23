<template>
  <div class="sidebarWrapper">
    <div class="divider" />
    <div class="buttonWrapper">
      <PageButton
        title="me."
        description="a little summary about me."
        :index="0"
        :selectedIndex="selectedIndex"
        @onPageSelectCallback="onPageSelect"
      />
      <PageButton
        title="games."
        description="my takes on video games, compiled into a neat database."
        :index="1"
        :selectedIndex="selectedIndex"
        @onPageSelectCallback="onPageSelect"
      />
      <PageButton
        title="blog."
        description="my thoughts, lined up."
        :index="2"
        :selectedIndex="selectedIndex"
        @onPageSelectCallback="onPageSelect"
      />
      <PageButton
        title="projects."
        description="projects i did and hopefully will do."
        :index="3"
        :selectedIndex="selectedIndex"
        @onPageSelectCallback="onPageSelect"
      />
    </div>
  </div>
</template>

<script>
import PageButton from "./PageButton.vue";

export default {
  name: "Sidebar",
  props: ["selectedIndex", "isPageViewerBeingAnimated"],
  components: { PageButton },

  data() {
    return {};
  },

  methods: {
    onPageSelect(index) {
      if (this.isPageViewerBeingAnimated) return;
      this.$emit("onPageSelectCallback", index);
    },
  },
};
</script>

<style scoped lang="scss">
.sidebarWrapper {
  height: 100%;

  @media screen and (max-width: 768px) {
    right: 0;
    position: fixed;
    width: 100%;

    z-index: 100;
  }

  @media screen and (min-width: 768px) {
    min-width: 25vw;
    width: 468px;
  }

  background-color: $background-secondary;

  background-image: url("../../../assets/patterns/pattern.svg");
  background-repeat: repeat;

  background-size: 750px 866px;
  background-position: 0 0;

  display: flex;
  flex-direction: row;

  animation: slide 100s linear infinite;

  @keyframes slide {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 750px 433px;
    }

    100% {
      background-position: 1500px 866px;
    }
  }

  .divider {
    width: 2px;
    background-color: $divider;
    height: 100%;
  }

  .buttonWrapper {
    padding: 16px;

    width: 100%;
    display: flex;

    flex-grow: 1;
    flex-direction: column;

    align-items: center;

    @media screen and (max-width: 768px) {
      justify-content: start;
    }

    justify-content: center;

    gap: 32px;
  }
}
</style>
