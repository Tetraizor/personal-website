<template>
  <div class="page">
    <div class="content">
      <h1>Games</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Games',
  props: ["selectedIndex", "index"],
  components: {},

  data() {
    return {
    }
  },
}
</script>

<style scoped lang="scss">
.page {
  overflow: hidden;

  background-color: red;

  width: 100%;
  height: 100%;

  .content {
    padding: 32px;
  }
}
</style>