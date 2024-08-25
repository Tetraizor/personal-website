<template>
  <div class="page">
    <div class="content">
      <div class="header">
        <h1>umuthan <span style="font-weight: 200">özel*</span></h1>
        <template v-if="!screenStore.isMobile">
          <div class="navbar">
            <div class="navButton">
              <h2>about</h2>
            </div>
            <div class="navButton">
              <h2>socials</h2>
            </div>
            <div class="navButton">
              <h2>contact</h2>
            </div>
          </div>
        </template>
      </div>
      <template v-if="screenStore.isMobile">
        <div class="navbarMobile">
          <span class="navButton">
            <h2>about</h2>
          </span>
          <span class="navButton">
            <h2>socials</h2>
          </span>
          <span class="navButton">
            <h2>contact</h2>
          </span>
        </div>
      </template>
      <hr style="margin-top: 24px; margin-bottom: 24px" />
      <div class="contentBody">
        <RouterView />
      </div>
      <hr style="margin-top: 24px; margin-bottom: 24px" />
    </div>
  </div>
</template>

<script lang="ts">
import { useScreenStore } from "@/stores/screenStore";
import { RouterView } from "vue-router";

export default {
  name: "Me",
  props: ["selectedIndex", "index"],
  components: {},

  data() {
    return {
      screenStore: useScreenStore(),
    };
  },
};
</script>

<style scoped lang="scss">
.page {
  overflow: hidden;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    max-width: 1228px;

    padding: 32px;

    @media screen and (max-width: 1228px) {
      padding: 24px;
    }

    .contentBody {
      height: 100%;
      flex-grow: 1;
    }

    .header {
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar {
      display: flex;
      flex-direction: row;

      gap: 32px;
    }

    .navbarMobile {
      display: flex;
      flex-direction: row;

      gap: 32px;

      margin-top: 10px;

      .navButton {
        h2 {
          display: inline !important;
        }
      }
    }

    .navButton {
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
