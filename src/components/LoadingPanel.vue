<template>
  <div class="loadingContainer" :class="{ loading: loading }">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingPanel",
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.loadingContainer {
  position: relative;
  top: -100%;

  display: flex;

  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  pointer-events: none;
  opacity: 0;

  transition: opacity 0.2s, background-color 0.2s;

  &.loading {
    background-color: rgba(0, 0, 0, 0.603);
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

  pointer-events: none;
}
</style>
