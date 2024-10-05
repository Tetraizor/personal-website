<template>
  <div class="meViewWrapper">
    <div class="meView">
      <div class="header">
        <div class="headerContent">
          <div style="display: flex; flex-direction: row; align-items: center">
            <h1 class="title">
              umuthan <span style="font-weight: 200">özel</span>
            </h1>
          </div>
          <template v-if="!screenStore.isMobile">
            <nav class="navbar">
              <div class="verticalDivider"></div>
              <div
                class="navButton"
                :class="{
                  notSelected: navigationStore.currentPageName !== 'about',
                }"
                @click.prevent="() => changePage('about')"
              >
                <h2>about</h2>
              </div>
              <div
                class="navButton"
                :class="{
                  notSelected: navigationStore.currentPageName !== 'socials',
                }"
                @click.prevent="
                  () => navigationStore.changePageByName('socials')
                "
              >
                <h2>socials</h2>
              </div>
              <div
                class="navButton"
                :class="{
                  notSelected: navigationStore.currentPageName !== 'contact',
                }"
                @click.prevent="
                  () => navigationStore.changePageByName('contact')
                "
              >
                <h2>contact</h2>
              </div>
            </nav>
          </template>
        </div>
        <template v-if="screenStore.isMobile">
          <div class="navbarMobile">
            <span
              class="navButton"
              :class="{
                selected: navigationStore.currentPageName !== 'about',
              }"
              @click.prevent="() => navigationStore.changePageByName('about')"
            >
              <h2>about</h2>
            </span>
            <span
              class="navButton"
              :class="{
                selected: navigationStore.currentPageName !== 'socials',
              }"
              @click.prevent="() => navigationStore.changePageByName('socials')"
            >
              <h2>socials</h2>
            </span>
            <span
              class="navButton"
              :class="{
                selected: navigationStore.currentPageName !== 'contact',
              }"
              @click.prevent="() => navigationStore.changePageByName('contact')"
            >
              <h2>contact</h2>
            </span>
          </div>
        </template>
      </div>
      <hr style="width: 100%" />
      <div class="body">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import NavigationPage, { getPageByName } from "@/types/NavigationPage";
import { RouterView } from "vue-router";

export default {
  name: "Me",
  props: ["index"],
  components: {},

  data() {
    return {
      screenStore: useScreenStore(),
      navigationStore: useNavigationStore(),
    };
  },

  methods: {
    changePage(page: string) {
      this.navigationStore.changePage(getPageByName(page));
    },
    getPageByName(name: string): NavigationPage {
      return getPageByName(name);
    },
  },
};
</script>

<style scoped lang="scss">
.meViewWrapper {
  overflow: hidden;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .meView {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .body {
      width: 100%;
      height: 100%; /* Ensure this fills the entire available height */
      flex-grow: 1;
      overflow: hidden; /* Prevent the .body from scrolling */
    }

    hr {
      border: 1px solid $divider-mid;
    }

    .header {
      width: 100%;

      padding-top: 6rem;
      padding-bottom: 2rem;

      @include respond-to(mobile) {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: start;

        padding-left: 2rem;
        padding-right: 2rem;

        padding-top: 4rem;
        padding-bottom: 1rem;
      }

      @include respond-to(desktop) {
        display: flex;
        justify-content: center;
        align-items: center;

        padding-left: 4rem;
        padding-right: 4rem;
      }

      background-image: url("@/assets/patterns/pattern.svg");
      background-repeat: repeat;

      background-size: 525px 606.2px;
      background-position: 0 0;

      display: flex;
      flex-direction: row;

      animation: slide 70s linear infinite;

      @keyframes slide {
        0% {
          background-position: 0 0;
        }

        50% {
          background-position: 525px 303.1px;
        }

        100% {
          background-position: 1050px 606.2px;
        }
      }

      h1 {
        &.title {
          @include respond-to(mobile) {
            font-size: 2rem;
          }
          @include respond-to(desktop) {
            font-size: 2.8rem;
          }
        }
      }

      .headerContent {
        max-width: $large-desktop;
        max-width: 1200px;
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .verticalDivider {
        height: 2rem;
        width: 3px;

        background-color: $text-primary;
      }
    }

    .navbar {
      display: flex;
      flex-direction: row;
      align-items: center;

      gap: 64px;
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

      &.notSelected {
        h2 {
          color: $text-disabled;
        }
      }

      &:hover {
        transform: scale(1.05);
      }

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      h2 {
        @include respond-to(mobile) {
          font-size: 1.2rem;
        }
        @include respond-to(desktop) {
          font-size: 1.8rem;
        }
      }
    }
  }
}
</style>
