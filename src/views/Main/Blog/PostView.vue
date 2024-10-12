<template>
  <div style="width: 100%; height: 100%">
    <div class="wrapper">
      <div class="content">
        <div v-if="post != null && post.content != null">
          <h1 style="margin-bottom: 1rem">
            {{ post?.title }}
          </h1>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-bottom: 0.5rem;
            "
          >
            <h3 style="opacity: 0.8; font-weight: normal">
              {{ daysSince }}
            </h3>
            <h3 style="opacity: 0.8; font-weight: normal">
              {{ post?.views || 0 }} views
            </h3>
          </div>
          <div class="titleDivider"></div>
          <Markdown :source="post.content" :styleOverride="{}"></Markdown>
        </div>
        <div v-else-if="error != ''">
          <h1>{{ error }}</h1>
        </div>
        <div v-else></div>
      </div>
    </div>
    <LoadingPanel :loading="loading" />
  </div>
</template>

<script lang="ts">
import { getDifferenceInDaysFormatted } from "@/utils/dateUtils";
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import Markdown from "@/components/Markdown.vue";
import Post from "@/models/Post";
import axios from "axios";
import LoadingPanel from "@/components/LoadingPanel.vue";

export default {
  name: "PostView",
  props: ["slug"],
  components: {
    Markdown,
    LoadingPanel,
  },

  data() {
    return {
      post: null as Post | null,

      loading: false,

      error: "",

      navigationStore: useNavigationStore(),
      screenStore: useScreenStore(),
    };
  },

  mounted() {
    this.updatePost();
  },

  methods: {
    updatePost() {
      this.loading = true;
      this.error = "";

      axios
        .get(
          import.meta.env.PUBLIC_SERVICE_URL +
            "/api/posts?service=getPostByUrlString&url_string=" +
            this.slug
        )
        .then(async (res) => {
          await new Promise((resolve) => setTimeout(resolve, 300));
          this.post = res.data.post;
        })
        .catch((err) => {
          if (err.status == 404) {
            this.error = "Post not found.";
            return;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  computed: {
    daysSince(): string {
      if (this.post == null) return "";
      return getDifferenceInDaysFormatted(
        new Date(this.post?.created_at),
        new Date()
      );
    },
  },

  watch: {
    slug() {
      this.updatePost();
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
  }

  h1 {
    font-size: 3rem;
    line-height: 4rem;
    font-weight: bolder;
  }

  .titleDivider {
    width: 100%;
    height: 4px;
    background-color: $accent;
    margin-bottom: 2rem;
  }
}
</style>
