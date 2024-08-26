<template>
  <div
    class="background"
    :class="{ on: sidebarStore.isOpen }"
    @click.prevent="onEmptySpaceClicked()"
  ></div>
  <div class="sidebar" :class="{ collapse: !sidebarStore.isOpen }">
    <div
      class="sidebarToggle"
      :class="{ collapse: !sidebarStore.isOpen }"
      @click.prevent="toggleSidebar()"
    >
      <div class="icon"></div>
    </div>
    <div class="sidebarWrapper">
      <div class="divider"></div>
      <div class="buttonWrapper">
        <PageButton
          title="me."
          description="a little summary about me."
          index="me"
          :selectedIndex="selectedIndex"
        />
        <PageButton
          title="games."
          description="my takes on video games, compiled into a neat database."
          index="games"
          :selectedIndex="selectedIndex"
        />
        <PageButton
          title="blog."
          description="my thoughts, lined up."
          index="blog"
          :selectedIndex="selectedIndex"
        />
        <PageButton
          title="projects."
          description="projects i did and hopefully will do."
          index="projects"
          :selectedIndex="selectedIndex"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageButton from "./PageButton.vue";
import { useSidebarStore } from "@/stores/sidebarStore";

export default defineComponent({
  name: "Sidebar",
  components: { PageButton },
  props: {
    isPageViewerBeingAnimated: {
      type: Boolean,
      default: false,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      sidebarStore: useSidebarStore(),
    };
  },

  methods: {
    toggleSidebar() {
      this.sidebarStore.toggle();
    },

    onEmptySpaceClicked() {
      this.sidebarStore.close();
    },
  },
});
</script>

<style scoped lang="scss">
.background {
  position: fixed;

  height: 100%;
  width: 100%;

  top: 0px;
  left: 0px;

  z-index: 99;

  transition: background-color 0.3s linear, pointer-events 0.3s;

  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;

  &.on {
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: all;
  }
}

.sidebar {
  position: fixed;
  height: 100%;

  right: 0;
  top: 0;

  transition: right 0.5s ease-in-out;

  z-index: 101;

  @media screen and (max-width: $tablet) {
    right: 0;
    position: fixed;
    width: 100%;

    z-index: 100;

    &.collapse {
      right: -100%;
    }
  }

  @media screen and (min-width: $tablet) {
    min-width: 25vw;
    width: 468px;

    &.collapse {
      right: calc(min(-468px, -25vw));
    }
  }

  .divider {
    width: 2px;
    background-color: $divider;
    height: 100%;
  }

  .buttonWrapper {
    @media screen and (max-width: $tablet) {
      padding: 32px;
      margin-top: 64px;
    }

    @media screen and (min-width: $tablet) {
      padding: 16px;
    }

    width: 100%;
    display: flex;

    flex-grow: 1;
    flex-direction: column;

    align-items: center;

    @media screen and (max-width: $tablet) {
      justify-content: start;
    }

    justify-content: center;

    gap: 32px;
  }

  .sidebarToggle {
    position: absolute;
    z-index: 100;

    cursor: pointer;

    transform: rotate(0deg);

    transition: left 0.5s, transform 0.5s, top 0.5s ease-in-out;

    @media screen and (max-width: $tablet) {
      left: 32px;
    }

    @media screen and (min-width: $tablet) {
      left: 16px;
    }

    &.collapse {
      @media screen and (min-width: $tablet) {
        left: -110px;
        top: 42px;
      }

      @media screen and (max-width: $tablet) {
        left: -64px;
        top: 16px;
      }

      transform: rotate(-180deg);
    }

    @media screen and (min-width: $tablet) {
      width: 60px;
      height: 60px;
      top: 42px;

      border: 4px solid $accent;
    }

    @media screen and (max-width: $tablet) {
      width: 40px;
      height: 40px;
      top: 32px;

      border: 3px solid $accent;
    }

    border-radius: 60px;

    background-color: $background-primary;

    .icon {
      background-image: url("@/assets/icons/arrow.svg");

      @media screen and (max-width: $tablet) {
        width: 36px;
        height: 40px;
      }

      @media screen and (min-width: $tablet) {
        width: 52px;
        height: 52px;
      }
    }
  }
}

.sidebarWrapper {
  position: relative;

  height: 100%;

  background-color: $background-secondary;

  background-image: url("@/assets/patterns/pattern.svg");
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
}
</style>
