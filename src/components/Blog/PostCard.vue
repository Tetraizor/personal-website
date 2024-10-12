<template v-if="post">
  <div class="postCard">
    <div
      class="backgroundImage"
      :style="{
        backgroundImage: 'url(' + post.thumbnail_url + ')',
      }"
    ></div>
    <div class="gradient"></div>
    <div class="content">
      <h2>{{ post.title + " test " + post.title }}</h2>
      <p>{{ post.description }}</p>
    </div>
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
      rgba(0, 0, 0, 0.664) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}
</style>
