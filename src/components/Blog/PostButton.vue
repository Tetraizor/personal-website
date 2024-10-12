<template>
  <div
    class="postButton"
    @click.prevent="clicked"
    :class="{ selected: post.url_string == navigationStore.currentPageName }"
  >
    <h1 class="title">{{ post.title }}</h1>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <p class="subtitle">{{ daysSince }}</p>
      <p class="subtitle">{{ post?.views | 0 }} views</p>
    </div>
  </div>
</template>

<script lang="ts">
import Post from "@/models/Post";
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import { getDifferenceInDaysFormatted } from "@/utils/dateUtils";
import { PropType } from "vue";

export default {
  name: "PostButton",
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
    collapse: {
      type: Function as PropType<Function>,
      required: true,
      default: false,
    },
  },
  emits: ["postSelected"],

  data() {
    return {
      navigationStore: useNavigationStore(),
      screenStore: useScreenStore(),
    };
  },

  methods: {
    clicked() {
      if (this.post.url_string == this.navigationStore.currentPageName) {
        this.navigationStore.changePageByName("defaultPostView");
      } else {
        this.$emit("postSelected", this.post.url_string);
      }

      if (this.screenStore.isMobile) {
        this.collapse();
      }
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
};
</script>

<style lang="scss" scoped>
.postButton {
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  transition: background-color 0.2s, border-color 0.2s;

  user-select: none;

  border-color: transparent;
  border-width: 3px;
  border-style: solid;

  backdrop-filter: blur(6px);
  background-color: $background-tertiary-transparent;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  animation: slideIn 0.3s ease;

  &.selected {
    background-color: $background-secondary-transparent;
    border-color: $accent;

    &:hover {
      background-color: $background-secondary;
    }
  }

  &:hover {
    background-color: $background-tertiary;
  }

  h1 {
    font-weight: normal;
    font-size: 1.4rem;
  }

  p {
    color: $text-disabled;
  }
}

.title {
  color: $text-primary;
}
</style>
