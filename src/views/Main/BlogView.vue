<template>
  <div class="blogViewWrapper">
    <div class="blogView">
      <LeftPanel
        :posts="posts"
        :loading="loading"
        ref="leftPanel"
        @postSelected="goToPost"
        @update:searchName="(searchName) => (filterSearchName = searchName)"
      />
      <div class="rightPanel">
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            :goToPost="goToPost"
            @onScroll="onScroll"
            ref="routerComponent"
          />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import NavigationPage, { getPageByName } from "@/models/NavigationPage";
import LeftPanel from "./Blog/LeftPanel.vue";
import Post from "@/models/Post";
import axios from "axios";
import { useScreenStore } from "@/stores/screenStore";

export default {
  name: "Blog",
  props: ["selectedIndex", "index"],
  components: {
    LeftPanel,
  },

  data() {
    return {
      navigationStore: useNavigationStore(),
      posts: [] as Post[],
      postsTemp: [] as Post[],
      loading: false,

      filterSearchName: "",

      searchCallStack: [] as Function[],

      screenStore: useScreenStore(),
    };
  },

  async mounted() {
    this.fetchPostList();
  },

  methods: {
    goToPost(url_string: string) {
      const page: NavigationPage = new NavigationPage(
        url_string,
        "",
        "/" + url_string,
        true,
        []
      );
      page.setParent(getPageByName("blog"));
      this.navigationStore.changePage(page);
    },

    async fetchPostList() {
      try {
        let url =
          import.meta.env.PUBLIC_SERVICE_URL + "/api/posts?service=getPostList";
        if (this.filterSearchName !== "") {
          url += `&search=${this.filterSearchName}`;
        }

        const response = await axios.get(url);
        const postsResponse: Post[] = response.data.posts;

        this.postsTemp = [];
        this.postsTemp.push(...postsResponse);

        this.posts = [];

        for (const post of postsResponse) {
          await new Promise((resolve) => setTimeout(resolve, 150));

          for (const tempPost of this.postsTemp) {
            if (post.post_id === tempPost.post_id) {
              this.posts.push(post);
              this.postsTemp.splice(this.postsTemp.indexOf(tempPost), 1);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    onScroll(event: Event) {
      const leftPanel = this.$refs.leftPanel as InstanceType<typeof LeftPanel>;
      leftPanel.handleScroll(event);
    },

    debounce(func: Function, wait: number) {
      this.searchCallStack.push(func);

      setTimeout(() => {
        if (this.searchCallStack.length === 0) return;

        const func = this.searchCallStack.pop();
        this.searchCallStack = [];

        if (func) func();
      }, wait);
    },
  },

  watch: {
    filterSearchName() {
      this.debounce(() => {
        this.fetchPostList();
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.blogViewWrapper {
  overflow: hidden;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .blogView {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .rightPanel {
      height: 100%;
      flex: 1;
    }
  }
}
</style>
