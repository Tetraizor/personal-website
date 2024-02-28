<template>
  <div class="page">
    <div class="content">
      <h1>Umuthan Özel</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Me',
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

  background-color: green;

  width: 100%;
  height: 100%;

  .content {
    padding: 32px;
  }
}
</style>