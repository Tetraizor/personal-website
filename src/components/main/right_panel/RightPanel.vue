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

  background-image: url('../../../assets/patterns/pattern.svg');
  background-repeat: repeat;

  background-size: 750px 866px;
  background-position: 0 0;

  display: flex;
  flex-direction: row;

  animation: slide 100s linear infinite;

  @keyframes slide {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 750px 433px;
    }

    100% {
      background-position: 1500px 866px;
    }
  }

  .divider {
    width: 2px;
    background-color: $divider;
    height: 100%;
  }
}
</style>