<template>
  <div class="mainWrapper">
    <PageViewer :selectedIndex="selectedIndex" />
    <RightPanel
      :selectedIndex="selectedIndex"
      @onPageSelectCallback="onPageSelect"
    />
  </div>
</template>

<script>
import RightPanel from './right_panel/RightPanel.vue'
import PageViewer from './PageViewer.vue'

export default {
  name: 'Main',
  props: [],
  components: {
    RightPanel,
    PageViewer,
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  methods: {
    onPageSelect(index) {
      this.selectedIndex = index;
    }
  },
}
</script>

<style scoped lang="scss">
.mainWrapper {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
}
</style>