<template>
  <div
    class="featuredContainer"
    ref="container"
    :class="{ active: screenStore.isMobile || hovering }"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <div style="height: 100%">
      <div
        v-if="isImageDownloaded"
        class="image"
        :style="{
          backgroundImage: `url(${featured.thumbnail_url})`,
          aspectRatio: aspect,
          opacity: 1,
        }"
      >
        <div class="shade" />
      </div>
      <div v-else class="spinnerContainer">
        <div class="spinner"></div>
      </div>
      <div class="bottom">
        <div class="background"></div>
        <h2 class="title">{{ featured.title }}</h2>
        <div class="descriptionWrapper">
          <p>
            {{ featured.content }}<span class="arrow">{{ " ->" }}</span>
          </p>
        </div>
      </div>
      <div class="heightFixer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import FeaturedItemType from "@/interface/FeaturedItemType";
import { useScreenStore } from "@/stores/screenStore";

export default defineComponent({
  name: "FeaturedContainer",
  props: {
    featured: {
      type: Object as () => FeaturedItemType,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  components: {},

  data() {
    return {
      hovering: false,
      isImageDownloaded: false,
      aspect: "16/9",

      screenStore: useScreenStore(),
    };
  },

  methods: {
    preloadImage(url: string) {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
          resolve(img);
        };

        img.onerror = () => {
          reject(new Error(`Failed to load image: ${url}`));
        };
      });
    },
  },

  async mounted() {
    this.preloadImage(this.featured.thumbnail_url)
      .then((image) => {
        this.isImageDownloaded = true;

        // Wait for the image to be rendered, then calculate the aspect ratio.
        // This 10ms of delay is actually necessary for the css animation to play.
        setTimeout(() => {
          this.aspect = (image.width / image.height).toString();
        }, 10);
      })
      .catch((err) => {
        console.error(err);
      });
  },
});
</script>

<style lang="scss" scoped>
.featuredContainer {
  position: relative;
  width: 100%;

  background-image: url("@/assets/patterns/pattern.svg");
  background-size: 400px;

  cursor: pointer;

  margin-bottom: 4rem;
  transition: height 0.3s;

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  animation: slideInRight 0.3s ease-out;

  .image {
    background-size: cover;
    aspect-ratio: 16/9;
    transition: aspect-ratio 0.3s;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    animation: fadeIn 0.3s ease-out;

    .shade {
      background-image: linear-gradient(
        to bottom,
        #00000000 0%,
        #00000000 30%,
        #252525dd 100%
      );

      height: 100%;
      width: 100%;

      opacity: 1;

      transition: opacity 0.5s;
    }
  }

  .bottom {
    background-color: $accent;
    height: 3px;
    width: 100%;

    position: absolute;
    bottom: 0;

    transition: height 0.3s, background-color 0.3s;

    h2 {
      margin-top: 0.3rem;
    }

    @include respond-to(desktop) {
      p {
        font-size: 1rem;
      }
    }

    @include respond-to(mobile) {
      h2 {
        font-size: 1.2rem;
        line-height: 1.4rem;
      }

      p {
        font-size: 0.9rem;
        line-height: 1rem;
      }
    }

    .title {
      position: absolute;
      top: -2.5rem;
      margin-left: 0.6rem;

      transition: top 0.3s;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .descriptionWrapper {
      height: 100%;
      width: 100%;
      position: absolute;

      top: 0.2rem;
      margin-left: 0.6rem;

      overflow: hidden;

      transition: top 0.3s;
    }

    .background {
      height: 100%;
      width: 100%;
      position: absolute;

      opacity: 0;

      transition: opacity 0.3s;
    }
  }

  .heightFixer {
    height: 0px;

    transition: height 0.3s;
  }

  &.active {
    .image {
      .shade {
        opacity: 0;
      }
    }

    .bottom {
      height: 100px;

      background-color: transparent;

      .title {
        position: relative;
        top: 0.2rem;
      }

      .background {
        opacity: 1;
      }

      .descriptionWrapper {
        top: 2.5rem;
      }
    }

    .heightFixer {
      height: 100px;
    }
  }

  .spinnerContainer {
    width: 100%;
    aspect-ratio: 16/9;

    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    animation: fadeIn 0.3s ease-out;

    .spinner {
      background-image: url("@/assets/svg/spinner.svg");
      width: 24px;
      height: 24px;
    }
  }

  .arrow {
    color: $accent;
  }
}
</style>
