<template>
  <div class="rightPanelWrapper">
    <div class="divider" />
    <div class="buttonWrapper">
      <PageButton
        title="me."
        :index=0
        description="a little summary about me."
        :selectedIndex="selectedIndex"
        @pageSelect="onPageSelect"
      />
      <PageButton
        title="games."
        :index=1
        description="my takes on video games, compiled into a neat database."
        :selectedIndex="selectedIndex"
        @pageSelect="onPageSelect"
      />
      <PageButton
        title="blog."
        :index=2
        description="my thoughts, lined up."
        :selectedIndex="selectedIndex"
        @pageSelect="onPageSelect"
      />
      <PageButton
        title="projects."
        :index=3
        description="projects i did and hopefully will do."
        :selectedIndex="selectedIndex"
        @pageSelect="onPageSelect"
      />
    </div>
  </div>
</template>

<script>

import PageButton from './PageButton.vue'

export default {
  name: 'RightPanel',
  props: {},
  components: { PageButton },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  methods: {
    onPageSelect(index) {
      this.selectedIndex = index;
    },
  },
}

</script>

<style scoped lang="scss">
.rightPanelWrapper {
  max-width: 25vw;
  width: 512px;
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

  .buttonWrapper {
    padding: 16px;

    width: 100%;
    display: flex;

    flex-grow: 1;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 32px;
  }
}
</style>