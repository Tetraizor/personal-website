<template>
  <div class="pageViewerWrapper">
    <div
      class="wrapper"
      :class="{ collapsed: this.isCollapsed }"
      :style="transitionData"
      ref="wrapper"
    >
      <div class="cross tl" :class="{ rotated: crossRotated }" />
      <div class="cross br" :class="{ rotated: crossRotated }" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageViewer",
  props: ["selectedIndex"],
  components: {},

  data() {
    return {
      isCollapsed: false,
      isBeingAnimated: false,
      shownPageIndex: 0,

      collapsedStayDuration: 800,
      collapseTime: 200,
      rotateMargin: 150,
      crossRotated: false,
    };
  },

  computed: {
    transitionData() {
      return {
        "--collapse-time": this.collapseTime + "ms",
        "--collapsed-stay-duration": this.collapsedStayDuration + "ms",
        "--rotate-margin": this.rotateMargin + "ms",
      };
    },
  },

  watch: {
    selectedIndex(newIndex) {
      // Instant the collapsing begins.
      this.$emit("onBeingAnimatedStateChanged", true);
      this.isBeingAnimated = true;
      this.isCollapsed = true;

      setTimeout(() => {
        // Instant the collapsing ends, and crosses stay still.
        // After collapsing, change page, and start expanding back.
        this.shownPageIndex = newIndex;

        this.$emit("onPageCollapsed");
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
            this.$emit("onBeingAnimatedStateChanged", false);
          }, this.collapseTime);
        }, this.collapsedStayDuration);
      }, this.collapseTime);
    },
  },
};
</script>

<style scoped lang="scss">
.pageViewerWrapper {
  background-color: $background-primary;

  flex-grow: 1;

  height: 100%;
  width: 100%;

  padding: 70px 80px;

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
      background-image: url("../../assets/patterns/cross.svg");
      width: 60px;
      height: 60px;

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

      transform: rotate(0);
      transition: transform
        calc(
          (var(--collapsed-stay-duration)) - calc((var(--rotate-margin)) * 2)
        )
        ease-in-out;

      &.rotated {
        transform: rotate(180deg);
      }

      &.tl {
        top: -30px;
        left: -30px;
      }

      &.br {
        bottom: -30px;
        right: -30px;
      }
    }

    .content {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
