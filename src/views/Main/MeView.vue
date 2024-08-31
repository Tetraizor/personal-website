<template>
  <div class="page">
    <div class="content">
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
                  selected: navigationStore.getSubPage('me') !== 'about',
                }"
                @click.prevent="() => changeSubPage('about')"
              >
                <h2>about</h2>
              </div>
              <div
                class="navButton"
                :class="{
                  selected: navigationStore.getSubPage('me') !== 'socials',
                }"
                @click.prevent="() => changeSubPage('socials')"
              >
                <h2>socials</h2>
              </div>
              <div
                class="navButton"
                :class="{
                  selected: navigationStore.getSubPage('me') !== 'contact',
                }"
                @click.prevent="() => changeSubPage('contact')"
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
                selected: navigationStore.getSubPage('me') !== 'about',
              }"
              @click.prevent="() => changeSubPage('about')"
            >
              <h2>about</h2>
            </span>
            <span
              class="navButton"
              :class="{
                selected: navigationStore.getSubPage('me') !== 'socials',
              }"
              @click.prevent="() => changeSubPage('socials')"
            >
              <h2>socials</h2>
            </span>
            <span
              class="navButton"
              :class="{
                selected: navigationStore.getSubPage('me') !== 'contact',
              }"
              @click.prevent="() => changeSubPage('contact')"
            >
              <h2>contact</h2>
            </span>
          </div>
        </template>
      </div>
      <hr style="margin-bottom: 24px; width: 100%" />
      <div class="contentBody">
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
    changeSubPage(subPage: string) {
      this.navigationStore.changeSubPage("me", subPage);
    },
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
    align-items: center;
    justify-content: center;

    .contentBody {
      width: 100%;
      height: 100%;
      flex-grow: 1;
    }

    hr {
      border: 1px solid $divider-mid;
    }

    .header {
      width: 100%;

      padding-top: 92px;
      padding-bottom: 32px;

      @include respond-to(mobile) {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: start;

        padding-left: 2rem;
        padding-right: 2rem;
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

      &.selected {
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
