<template>
  <div class="rightPanelWrapper">
    <div class="divider">

    </div>
    <h1>Right Panel</h1>
  </div>
</template>

<script>

export default {
  name: 'RightPanel',
  props: {},
  components: {},

  data() {
    return {
    }
  },
}

</script>

<style scoped lang="scss">
.rightPanelWrapper {
  width: 418px;
  background-color: $background-secondary;

  display: flex;
  flex-direction: row;

  .divider {
    width: 2px;
    background-color: $divider;
    height: 100%;
  }
}
</style>