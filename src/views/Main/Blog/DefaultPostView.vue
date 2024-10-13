<template>
  <div style="width: 100%; height: 100%">
    <div class="wrapper" @scroll="handleScroll">
      <div class="content">
        <h1 style="margin-bottom: 1rem">blog</h1>
        <div class="titleDivider"></div>
        <p>
          Welcome to my blog! Here, you’ll find my unfiltered thoughts on
          literally any topic that comes to mind—often at times when I should be
          doing things.
        </p>
        <h2>pinned</h2>
        <div class="pinnedContainer">
          <template v-for="(post, index) in pinned" :key="index">
            <PostCard :post="post" />
            <PostCard :post="post" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Post from "@/models/Post";
import { useNavigationStore } from "@/stores/navigationStore";
import PostCard from "@/components/Blog/PostCard.vue";
import axios from "axios";

export default {
  name: "DefaultPostView",
  props: ["goToPost"],
  components: { PostCard },
  emits: ["onScroll"],

  data() {
    return {
      pinned: [] as Post[],

      loading: false,

      navigationStore: useNavigationStore(),
    };
  },

  mounted() {
    this.fetchPinnedList();
  },

  methods: {
    async fetchPinnedList() {
      try {
        const response = await axios.get(
          import.meta.env.PUBLIC_SERVICE_URL +
            "/api/posts?service=getPostList&pinned"
        );

        const pinnedResponse = response.data.posts;

        for (const item of pinnedResponse) {
          await new Promise((resolve) => setTimeout(resolve, 150));
          this.pinned.push(item);
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    handleScroll(event: Event) {
      this.$emit("onScroll", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  overflow-y: auto;

  .content {
    width: 100%;
    max-width: 768px;
    height: 100%;

    padding-top: 4rem;
    padding-bottom: 4rem;

    margin: 0 4rem;
    @include respond-to("mobile") {
      margin: 0 25px;
    }
  }

  h1 {
    font-size: 3rem;
    line-height: 4rem;
    font-weight: bolder;
  }

  h2 {
    font-size: 2rem;
    line-height: 3rem;
    font-weight: bolder;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.8rem;
  }

  .titleDivider {
    width: 100%;
    height: 4px;
    background-color: $accent;
    margin-bottom: 2rem;
  }
}

.pinnedPost {
  padding: 1rem;

  background-color: $background-secondary;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: $background-tertiary;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: bolder;
  }
}

.pinnedContainer {
  width: 100%;

  display: grid;

  grid-template-columns: 1fr;
  @include respond-to("xlarge") {
    grid-template-columns: 1fr 1fr;
  }
  grid-gap: 2rem;

  padding-bottom: 2rem;
}
</style>
