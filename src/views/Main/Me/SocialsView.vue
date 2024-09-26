<template>
  <div class="socialsPage">
    <div class="content">
      <h1>Socials</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";

export default {
  name: "SocialsView",
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
.socialsPage {
  position: absolute;
  width: 100%;
  height: 100%;

  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  .content {
    width: 100%;
    height: 100%;

    max-width: $large-desktop;
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
}
.slide-enter-to {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
</style>
