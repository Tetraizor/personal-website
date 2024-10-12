<template>
  <div class="aboutPage">
    <div class="content">
      <div class="leftView"></div>
      <div class="rightView">
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: end;
            margin-bottom: 0.4rem;
          "
        >
          <h1>featured</h1>
          <h1>
            <a
              class="highlightSelf"
              style="line-height: 1.3rem; font-weight: normal"
              href="/projects"
            >
              see all
            </a>
          </h1>
        </div>
        <template v-for="featured in featured" :key="featured.featured_id">
          <featuredContainer :featured="featured" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import featuredContainer from "@/components/Me/about/FeaturedContainer.vue";
import FeaturedItemType from "@/interface/FeaturedItemType";
import axios from "axios";

export default {
  name: "AboutView",
  props: [],
  components: { featuredContainer },

  data() {
    return {
      screenStore: useScreenStore(),
      navigationStore: useNavigationStore(),

      featured: [] as FeaturedItemType[],
    };
  },

  methods: {
    getFeatured() {
      axios
        .get(import.meta.env.PUBLIC_SERVICE_URL + "/api/featured")
        .then(async (res) => {
          await new Promise((resolve) => setTimeout(resolve, 300));
          const featuredItems = res.data.featured;

          for (let i = 0; i < featuredItems.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            this.featured.push(featuredItems[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  mounted() {
    this.getFeatured();
  },

  computed: {},
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
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @include respond-to(mobile) {
    overflow-y: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @include respond-to(desktop) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  padding-left: 4rem;
  padding-right: 4rem;

  .content {
    width: 100%;
    max-width: $large-desktop;

    height: 100%;

    @include respond-to(mobile) {
      justify-content: center;
    }

    @include respond-to(desktop) {
      flex-direction: row;
      display: flex;
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
      margin: 2rem 0;
    }
  }

  .leftView {
    padding: 2rem 0 2rem 0;

    @include respond-to(mobile) {
      width: 100%;
    }
    @include respond-to(desktop) {
      width: 60%;

      margin-right: 3rem;

      padding-right: 2rem;

      overflow-y: auto;
      justify-content: center;
    }
  }

  .rightView {
    padding: 2rem 0 2rem 0;

    @include respond-to(mobile) {
      width: 100%;
    }
    @include respond-to(desktop) {
      flex: 1;

      overflow-y: auto;
      justify-content: center;

      -ms-overflow-style: none;
      scrollbar-width: none;
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
