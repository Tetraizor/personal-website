<template>
  <div class="pageViewerWrapper">
    <div
      class="wrapper"
      :class="{ collapsed: isCollapsed }"
      :style="transitionData"
      ref="wrapper"
    >
      <div class="content">
        <RouterView></RouterView>
      </div>
      <div
        class="cross tl"
        :class="{
          rotated: crossRotated,
          collapsed: isCollapsed,
          hideCross: navigationStore.currentPage.hideCross,
        }"
        :style="crossData"
      ></div>
      <div
        class="cross br"
        :class="{
          rotated: crossRotated,
          collapsed: isCollapsed,
          hideCross: navigationStore.currentPage.hideCross,
        }"
        :style="crossData"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import NavigationPage, { getPageByName } from "@/models/NavigationPage";

export default {
  name: "PageViewer",
  props: ["selectedIndex"],
  components: {},

  data() {
    return {
      isCollapsed: false,
      isBeingAnimated: false,

      shownPageIndex: getPageByName("me") as NavigationPage,

      collapsedStayDuration: 800,
      collapseTime: 200,
      rotateMargin: 150,
      crossRotated: false,

      navigationStore: useNavigationStore(),

      screenStore: useScreenStore(),
    };
  },

  computed: {
    transitionData() {
      return {
        "--collapse-time": this.collapseTime + "ms",
        "--rotate-margin": this.rotateMargin + "ms",
        "--collapsed-stay-duration": this.collapsedStayDuration + "ms",
      };
    },
    crossData() {
      return {
        "--size": this.screenStore.isMobile ? "40px" : "50px",
      };
    },
  },

  methods: {
    transitionPageView(newPage: NavigationPage) {
      // Instant the collapsing begins.
      this.navigationStore.increaseTransitionStack();
      this.isCollapsed = true;

      setTimeout(() => {
        // Instant the collapsing ends, and crosses stay still.
        // After collapsing, change page, and start expanding back.
        this.shownPageIndex = newPage;
        this.navigationStore.changePage(newPage);

        setTimeout(() => {
          this.crossRotated = !this.crossRotated;
        }, this.rotateMargin);

        setTimeout(() => {},
        this.collapsedStayDuration - this.rotateMargin * 2);

        setTimeout(() => {
          // Instant the expanding begins.
          this.isCollapsed = false;

          setTimeout(() => {
            // Instant the expanding ends.
            this.navigationStore.decreaseTransitionStack();
          }, this.collapseTime);
        }, this.collapsedStayDuration);
      }, this.collapseTime);
    },
  },

  mounted() {},
};
</script>

<style scoped lang="scss">
.pageViewerWrapper {
  // background-color: $background-primary;
  background-image: linear-gradient(
    180deg,
    $background-primary 0%,
    $background-primary-alternative 100%
  );

  flex-grow: 1;

  height: 100%;
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  .wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    transition: height var(--collapse-time) ease-in-out,
      width var(--collapse-time) ease-in-out,
      padding var(--collapse-time) ease-in-out;

    &.collapsed {
      height: 0;
      width: 0;
      padding: 0;
    }

    .cross {
      position: absolute;
      background-image: url("@/assets/icons/cross.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;

      width: var(--size);
      height: var(--size);

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        99% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(0);
        }
      }

      transition: transform
          calc(
            (var(--collapsed-stay-duration)) - calc((var(--rotate-margin)) * 2)
          )
          ease-in-out,
        top var(--collapse-time) ease-in-out,
        left var(--collapse-time) ease-in-out,
        bottom var(--collapse-time) ease-in-out,
        right var(--collapse-time) ease-in-out,
        width var(--collapse-time) ease-in-out,
        height var(--collapse-time) ease-in-out,
        opacity var(--collapse-time) ease-in-out;

      opacity: 1;

      &.hideCross {
        opacity: 0;
      }

      &.rotated {
        transform: rotate(180deg);
      }

      @include respond-to(mobile) {
        &.tl {
          top: 16px;
          left: 16px;

          &.collapsed {
            top: calc(var(--size) * -1 / 2);
            left: calc(var(--size) * -1 / 2);
          }
        }

        &.br {
          bottom: 30px;
          right: 16px;

          &.collapsed {
            bottom: calc(var(--size) * -1 / 2);
            right: calc(var(--size) * -1 / 2);
          }
        }
      }

      @include respond-to(desktop) {
        &.tl {
          top: calc(var(--size) / 2);
          left: calc(var(--size) / 2);

          &.collapsed {
            top: calc(var(--size) * -1 / 2);
            left: calc(var(--size) * -1 / 2);
          }
        }

        &.br {
          bottom: calc(var(--size) / 2);
          right: calc(var(--size) / 2);

          &.collapsed {
            bottom: calc(var(--size) * -1 / 2);
            right: calc(var(--size) * -1 / 2);
          }
        }
      }
    }

    .content {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
