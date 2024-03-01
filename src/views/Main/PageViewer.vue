<template>
  <div class="pageViewerWrapper">
    <div
      class="wrapper"
      :class="{ collapsed: this.isCollapsed }"
      ref="wrapper"
    >
      <div class="cross tl" />
      <div class="cross br" />
      <div class="cross br" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PageViewer',
  props: ["selectedIndex"],
  components: {},

  data() {
    return {
      isCollapsed: false,
      isBeingAnimated: false,
      shownPageIndex: 0,
    }
  },

  watch: {
    selectedIndex(newIndex) {
      this.$emit('onBeingAnimatedStateChanged', true);
      this.isBeingAnimated = true;
      this.isCollapsed = true;

      setTimeout(() => {
        this.isCollapsed = false;
        this.shownPageIndex = newIndex;

        this.$emit('onPageCollapsed');

        setTimeout(() => {
          this.$emit('onBeingAnimatedStateChanged', false);
        }, 100);
      }, 400);
    }
  }
}

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

    transition: height .15s ease-in, width .15s ease-in, padding .15s ease-in;

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