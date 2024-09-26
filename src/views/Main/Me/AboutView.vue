<template>
  <div class="aboutPage">
    <div class="scrollView">
      <div class="content">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";

export default {
  name: "AboutView",
  props: [],
  components: {},

  data() {
    return {
      screenStore: useScreenStore(),
      navigationStore: useNavigationStore(),
    };
  },
};
</script>

<style scoped lang="scss">
.aboutPage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .scrollView {
    overflow-y: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .content {
    width: 100%;
    max-width: $large-desktop;

    height: 100%;

    @include respond-to(mobile) {
      margin: 0 2rem;
    }

    @include respond-to(desktop) {
      margin: 0 4rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 0.4rem;

      @include respond-to(mobile) {
        font-size: 1.5rem;
      }
    }

    p,
    li {
      font-size: $font-p-large;
      line-height: $font-p-large * 1.5;
      @include respond-to(mobile) {
        font-size: $font-p-small;
        line-height: $font-p-small * 1.5;
      }
    }

    ul {
      margin-left: 2rem;

      li {
        color: $text-primary;
      }
    }

    .divider {
      width: 100%;
      margin: 1rem 0;
    }
  }
}

.slide-enter-from {
  transform: translateX(-100%);
  position: absolute;
}
.slide-leave {
  transform: translateX(0);
  position: absolute;
}

.slide-leave-to {
  transform: translateX(100%);
  position: absolute;

  transition-delay: 0;
}
.slide-enter-to {
  transform: translateX(0);

  transition-delay: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
</style>
