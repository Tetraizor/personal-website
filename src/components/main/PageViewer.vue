<template>
  <div class="pageViewerWrapper">
    <div
      class="wrapper"
      :class="{ collapsed: this.isCollapsed }"
      ref="wrapper"
    >
      <div class="cross tl" />
      <div class="cross br" />
      <div class="content">
        <Me
          v-if="this.selectedIndex == 0"
          :selectedIndex="this.selectedIndex"
          :index=0
        ></Me>
        <Games
          v-if="this.selectedIndex == 1"
          :selectedIndex="this.selectedIndex"
          :index=1
        ></Games>
        <Blog
          v-if="this.selectedIndex == 2"
          :selectedIndex="this.selectedIndex"
          :index=1
        ></Blog>
        <Projects
          v-if="this.selectedIndex == 3"
          :selectedIndex="this.selectedIndex"
          :index=1
        ></Projects>
      </div>
    </div>
  </div>
</template>

<script>

import Me from './pages/Me.vue'
import Games from './pages/Games.vue'
import Blog from './pages/Blog.vue'
import Projects from './pages/Projects.vue'

export default {
  name: 'PageViewer',
  props: ["selectedIndex"],
  components: {
    Me,
    Games,
    Blog,
    Projects,
  },

  data() {
    return {
      isCollapsed: false,
      isBeingAnimated: false,
    }
  },

  watch: {
    selectedIndex(newIndex) {
      this.$emit('onBeingAnimatedStateChanged', true);
      this.isBeingAnimated = true;
      this.isCollapsed = true;

      setTimeout(() => {
        this.isCollapsed = false;

        setTimeout(() => {
          this.$emit('onBeingAnimatedStateChanged', false);
        }, 500);
      }, 500);
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

    transition: height .2s ease-in, width .2s ease-in, padding .2s ease-in;

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