<template>
  <div class="leftPanel" :class="{ collapsed }">
    <div class="collapseButton" @click.prevent="collapsed = !collapsed">
      <i class="bars"></i>
    </div>
    <div class="verticalDivider"></div>
    <div class="hide">
      <div class="container">
        <div class="spinnerContainer" :class="{ loading: loading }">
          <i class="spinner"></i>
        </div>
        <h1 style="font-weight: normal; margin-bottom: 0.6rem">Posts</h1>
        <SearchBar />
        <template v-if="!loading">
          <template v-if="posts.length > 0">
            <div class="scroll">
              <div class="postContainer">
                <div class="post" v-for="post in posts" :key="post.url_string">
                  <PostButton
                    :post="post"
                    :collapse="collapse"
                    @postSelected="() => $emit('postSelected', post.url_string)"
                  />
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostType from "@/models/Post";
import SearchBar from "@/components/SearchBar.vue";
import { PropType } from "vue";
import PostButton from "@/components/Blog/PostButton.vue";
import { useScreenStore } from "@/stores/screenStore";
import { useNavigationStore } from "@/stores/navigationStore";

export default {
  name: "LeftPanel",
  props: {
    posts: {
      type: Object as PropType<PostType[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: { SearchBar, PostButton },
  emits: ["postSelected"],

  data() {
    return {
      collapsed: false,

      navigationStore: useNavigationStore(),
      screenStore: useScreenStore(),
    };
  },

  mounted() {
    if (this.screenStore.isMobile) {
      this.collapse();
    } else {
      this.open();
    }
  },

  methods: {
    collapse() {
      this.collapsed = true;
    },
    open() {
      this.collapsed = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.leftPanel {
  height: 100%;
  width: 100%;

  max-width: 500px;
  @include respond-to("mobile") {
    max-width: 100%;
    position: absolute;
    left: 0;

    z-index: 101;
    &.collapsed {
      z-index: inherit;
    }
  }

  overflow-y: visible;
  overflow-x: visible;

  background-color: $background-secondary;

  background-image: url("@/assets/patterns/pattern.svg");
  background-repeat: repeat;

  background-size: 750px 866px;
  background-position: 0 0;

  .scroll {
    height: 100%;
    overflow-y: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .postContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem 0;
  }

  .hide {
    overflow-y: hidden;
    overflow-x: hidden;

    height: 100%;
  }

  .container {
    position: relative;

    height: 100%;
    width: 500px;
    @include respond-to("mobile") {
      width: 100%;
    }

    padding: 25px;
  }

  transition: max-width 0.3s;

  position: relative;

  .collapseButton {
    position: absolute;
    left: calc(100% - 57px);
    top: 25px;

    z-index: 99;

    width: 32px;
    height: 32px;

    cursor: pointer;

    transition: left 0.3s;

    .bars {
      background-image: url("@/assets/icons/bars.svg");
      background-repeat: no-repeat;
      background-size: contain;

      display: block;

      width: 32px;
      height: 32px;

      color: $accent;
    }
  }
}

.collapsed {
  max-width: 0px;

  .collapseButton {
    left: calc(100% + 25px);
  }
}

.verticalDivider {
  position: absolute;
  top: 0;
  right: 0%;

  width: 2px;
  height: 100%;

  background-color: $divider-mid;
}

.spinnerContainer {
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% - 50px);

  position: absolute;

  height: 100%;

  pointer-events: none;

  transition: opacity 0.1s;

  opacity: 0;

  &.loading {
    opacity: 1;
  }
}

.spinner {
  background-image: url("@/assets/svg/spinner.svg");
  background-size: contain;
  background-repeat: no-repeat;

  width: 32px;
  height: 32px;

  display: block;

  margin: 0 auto;

  pointer-events: none;
}
</style>
