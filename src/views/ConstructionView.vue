<template>
  <div class="background">
    <div class="blurField">
      <div class="textWrapper">
        <h1 style="font-size: 3.5rem; margin-bottom: 2rem;">{{ title }}</h1>
        <h2 style="font-size: 2rem;">will be open, closer than you think, keep checking frequently.</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConstructionView',
  props: [],
  components: {
  },

  data() {
    return {
      title: 'under construction',
      doesTitleHaveCursor: false,
    }
  },

  mounted() {
    setInterval(() => {
      this.doesTitleHaveCursor = !this.doesTitleHaveCursor;

      if (!this.doesTitleHaveCursor) {
        this.title = this.title.slice(0, -1);
      } else {
        this.title = this.title + '|';
      }
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.background {
  background-color: $background-primary;
  background-image: url('../assets/patterns/pattern.svg');

  width: 100%;
  height: 100%;

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

  .blurField {
    backdrop-filter: blur(6px);

    width: 100%;
    height: 100%;

    .textWrapper {
      padding: 256px 15%;
    }
  }
}
</style>