<template>
  <div
    class="pageButton"
    :class="{
      selected: selected,
      expanded: expanded,
      hover: hover,
      disabled: disabled,
    }"
    @mouseenter="
      {
        hover = true;
        openDescription();
      }
    "
    @mouseleave="
      {
        hover = false;
        collapseDescription(1);
      }
    "
    @click.prevent="() => clicked()"
  >
    <div class="content">
      <div
        class="tlCorner"
        :class="{ selected: selected, expanded: expanded }"
      ></div>
      <div
        class="brCorner"
        :class="{ selected: selected, expanded: expanded }"
      ></div>
      <div
        class="outline"
        :class="{ selected: selected, expanded: expanded }"
      ></div>
      <h1>{{ title }}</h1>
      <h3
        v-if="
          description &&
          (selected || animatedText.length > 0 || screenStore.isMobile)
        "
      >
        {{ disabled ? "currently in progress" : buttonDescription }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useScreenStore } from "@/stores/screenStore";

import { PropType } from "vue";
import NavigationPage from "@/models/NavigationPage";

export default {
  name: "PageButton",
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    description: {
      type: String as PropType<string>,
      required: true,
    },
    pageData: {
      type: NavigationPage as PropType<NavigationPage>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  components: {},

  data() {
    return {
      hover: false as boolean,
      animatedText: "" as string,
      isAnimating: false as boolean,

      textAnimationDelay: 20 as number,

      navigationStore: useNavigationStore(),
      sidebarStore: useSidebarStore(),
      screenStore: useScreenStore(),
    };
  },

  computed: {
    selected() {
      return (
        this.$props.pageData.name === this.navigationStore.currentPage.name ||
        this.$props.pageData.name ===
          this.navigationStore.currentPage.parent?.name
      );
    },

    buttonDescription() {
      return this.selected || this.screenStore.isMobile
        ? this.description
        : this.animatedText;
    },

    expanded() {
      return this.hover || this.selected || this.screenStore.isMobile;
    },
  },

  methods: {
    openDescription(speed: number = -1) {
      this.isAnimating = true;
      this.addChar(speed);
    },

    addChar(speed: number = -1) {
      if (!this.hover) return;

      setTimeout(
        () => {
          if (this.animatedText.length < this.description.length) {
            this.animatedText += this.description[this.animatedText.length];
            this.addChar(speed);
          } else {
            this.isAnimating = false;
          }
        },
        speed > 0 ? speed : this.textAnimationDelay
      );
    },

    async clicked() {
      if (!this.navigationStore.canTransition || this.disabled) return;

      this.$emit("sidebarButtonPressed", this.pageData);
    },

    collapseDescription(speed: number = -1) {
      this.isAnimating = true;
      this.removeChar(speed);
    },
    removeChar(speed: number) {
      if (this.hover) return;

      setTimeout(
        () => {
          if (this.animatedText.length > 0) {
            this.animatedText = this.animatedText.slice(0, -1);
            this.removeChar(speed);
          } else {
            this.isAnimating = false;
          }
        },
        speed > 0 ? speed : this.textAnimationDelay
      );
    },
  },

  watch: {
    hover(value) {
      if (value) {
        this.openDescription();
      } else {
        this.collapseDescription();
      }
    },

    selected(isSelected) {
      if (!isSelected) {
        this.animatedText = this.description;
        this.collapseDescription(10);
      }
    },
  },

  events: {
    sidebarButtonPressed(page: string) {
      this.sidebarStore.close();
      this.$emit("sidebarButtonPressed", page);
    },
  },
};
</script>

<style scoped lang="scss">
.pageButton {
  cursor: pointer;
  overflow: hidden;

  width: 100%;
  position: relative;

  backdrop-filter: blur(6px);

  display: flex;

  // Transition Properties
  height: 5rem;
  background-color: $button-primary-transparent;
  transition: background-color 0.2s ease-in, height 0.2s ease-in;

  &.selected,
  &.hover {
    background-color: $button-primary-transparent-hover;
    transition: background-color 0.2s ease-in;
    height: 7.5rem;
  }

  &.expanded {
    height: 7.5rem;
    transition: height 0.2s ease-in;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  .content {
    width: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;

    justify-content: center;

    gap: 1.2rem;

    height: 100%;
  }

  .outline,
  .tlCorner,
  .brCorner {
    position: absolute;
    stroke-dasharray: 16px 4px;
  }

  .outline {
    border: $outline-width-large dashed $button-accent;
    @media screen and (max-width: $tablet) {
      border: $outline-width-small dashed $button-accent;
    }

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    transition: border 0.6s ease-in;

    &.selected,
    &.expanded,
    &.hover {
      border: $outline-width-large dashed $button-accent-selected;
      @media screen and (max-width: $tablet) {
        border: $outline-width-small dashed $button-accent-selected;
      }
    }
  }

  .tlCorner {
    border-left: $outline-width-large solid $button-accent;
    border-top: $outline-width-large solid $button-accent;

    @media screen and (max-width: $tablet) {
      border-left: $outline-width-small solid $button-accent;
      border-top: $outline-width-small solid $button-accent;
    }

    transition: border-left 0.6s ease-in, border-top 0.6s ease-in;

    &.selected,
    &.expanded {
      border-left: $outline-width-large solid $button-accent-selected;
      border-top: $outline-width-large solid $button-accent-selected;

      @media screen and (max-width: $tablet) {
        border-left: $outline-width-small solid $button-accent-selected;
        border-top: $outline-width-small solid $button-accent-selected;
      }
    }

    top: 0;
    left: 0;

    width: 24px;
    height: 24px;

    transition: width 0.6s, height 0.6s;

    &.selected {
      width: 100%;
      height: 100%;
    }
  }

  .brCorner {
    border-right: $outline-width-large solid $button-accent;
    border-bottom: $outline-width-large solid $button-accent;

    @media screen and (max-width: $tablet) {
      border-right: $outline-width-small solid $button-accent;
      border-bottom: $outline-width-small solid $button-accent;
    }

    transition: border-right 0.6s ease-in, border-bottom 0.6s ease-in;

    &.selected,
    &.expanded {
      border-right: $outline-width-large solid $button-accent-selected;
      border-bottom: $outline-width-large solid $button-accent-selected;

      @media screen and (max-width: $tablet) {
        border-right: $outline-width-small solid $button-accent-selected;
        border-bottom: $outline-width-small solid $button-accent-selected;
      }
    }

    right: 0;
    bottom: 0;

    width: 24px;
    height: 24px;

    transition: width 0.6s, height 0.6s;

    &.selected {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
