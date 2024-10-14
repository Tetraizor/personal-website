<template v-if="post">
  <div
    class="postCard"
    @click.prevent="() => goToPost(post.url_string)"
    @mousedown.prevent="handleMiddleClick"
  >
    <div
      class="backgroundImage"
      :style="{
        backgroundImage: 'url(' + post.thumbnail_url + ')',
      }"
    ></div>
    <div class="gradient"></div>
    <div class="content">
      <h2>{{ post.title }}</h2>
    </div>
    <div class="outline"></div>
  </div>
</template>

<script lang="ts">
import Post from "@/models/Post";
import { PropType } from "vue";

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
    goToPost: {
      type: Function as PropType<(postIndex: string) => void>,
      required: true,
    },
  },
  data() {
    return {};
  },

  methods: {
    handleMiddleClick(event: MouseEvent) {
      if (event.button === 1) {
        // Middle mouse button clicked
        const url = `${window.location.origin}/blog/${this.post.url_string}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.postCard {
  background-image: url("@/assets/patterns/pattern.svg");
  background-size: 100%;

  position: relative;

  aspect-ratio: 16 / 9;

  transition: width 0.15s, height 0.15s;
  animation: fadeIn 0.15s;

  border-bottom: solid 4px $accent;

  cursor: pointer;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .backgroundImage {
    width: 100%;
    height: 100%;

    background-size: cover;
    background-position: center;
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    padding: 1rem;

    h2 {
      margin: 0;
      color: white;
    }

    p {
      margin: 0;
      color: white;
    }
  }

  .gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    height: 100%;

    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0) 100%
    );

    transition: opacity 0.15s;
  }

  .outline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border: solid 2px transparent;
    border-color: transparent;
    border-bottom: none;

    transition: border-color 0.2s;

    &:hover {
      border: solid 2px $accent;
      border-bottom: none;
    }
  }
}
</style>
