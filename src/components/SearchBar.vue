<template>
  <div class="searchBar">
    <input :placeholder="placeholder" />
    <i class="icon"></i>
  </div>
</template>

<script lang="ts">
export default {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
  },
  components: {},

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.searchBar {
  position: relative;

  width: 100%;
  height: 3rem;
  border-bottom: 3px solid $accent;

  input {
    width: 100%;
    height: 100%;
    background-color: $input-background;

    padding: 1.2rem 1rem;
    border: none;

    font-size: 1.4rem;
    outline-width: 1px;
    outline-style: solid;
    outline-color: transparent;

    transition: outline-color 0.1s;

    color: $text-primary;

    &:focus {
      outline-color: $accent;
    }

    &::placeholder {
      color: $text-disabled;
      font-style: italic;
    }

    &:focus::placeholder {
      color: $text-disabled;
      font-style: italic;
    }
  }
}

.icon {
  position: absolute;
  right: 1rem;
  top: 0.9rem;

  width: 1.2rem;
  height: 1.2rem;

  background-image: url("@/assets/icons/search.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  pointer-events: none;
}
</style>
