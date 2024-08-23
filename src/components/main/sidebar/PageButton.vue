<template>
  <div
    class="pageButton"
    :class="{ selected: selected, hover: hover }"
    @mouseenter="
      {
        hover = true;
        openDescription();
      }
    "
    @mouseleave="
      {
        hover = false;
        collapseDescription();
      }
    "
    @click.prevent="$emit('onPageSelectCallback', index)"
  >
    <div class="content">
      <div class="tlCorner" :class="{ selected: selected, hover: hover }"></div>
      <div class="brCorner" :class="{ selected: selected, hover: hover }"></div>
      <div class="outline" :class="{ selected: selected, hover: hover }"></div>
      <h1>{{ title }}</h1>
      <h3 v-if="description && (selected || animatedText.length) > 0">
        {{ buttonDescription }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageButton",
  props: ["title", "description", "index", "selectedIndex"],
  components: {},

  data() {
    return {
      hover: false,
      animatedText: "",
      isAnimating: false,

      textAnimationDelay: 20,
    };
  },

  computed: {
    selected() {
      return this.$props.index === this.$props.selectedIndex;
    },

    buttonDescription() {
      return this.selected ? this.description : this.animatedText;
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
        speed != -1 ? speed : this.textAnimationDelay
      );
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
        speed != undefined ? speed : this.textAnimationDelay
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
  background-color: $button-primary;
  transition: background-color 0.2s ease-in, height 0.2s ease-in;

  &.selected {
    background-color: $button-primary-selected;
    transition: background-color 0.2s ease-in;
    height: 7.5rem;
  }

  &.hover {
    height: 7.5rem;
    transition: height 0.2s ease-in;
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
    border: $outline-width dashed $button-accent;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    transition: border 0.6s ease-in;

    &.selected,
    &.hover {
      border: $outline-width dashed $button-accent-selected;
    }
  }

  .tlCorner {
    border-left: $outline-width solid $button-accent;
    border-top: $outline-width solid $button-accent;

    transition: border-left 0.6s ease-in, border-top 0.6s ease-in;

    &.selected,
    &.hover {
      border-left: $outline-width solid $button-accent-selected;
      border-top: $outline-width solid $button-accent-selected;
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
    border-right: $outline-width solid $button-accent;
    border-bottom: $outline-width solid $button-accent;

    transition: border-right 0.6s ease-in, border-bottom 0.6s ease-in;

    &.selected,
    &.hover {
      border-right: $outline-width solid $button-accent-selected;
      border-bottom: $outline-width solid $button-accent-selected;
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
