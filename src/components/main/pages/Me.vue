<template>
  <div class="page">
    <div class="content">
      <div class="header">
        <h1>umuthan <span style="font-weight: 200;">özel*</span></h1>
        <div class="navbar">
          <div class="navButton">
            <h2>about</h2>
          </div>
          <div class="navButton">
            <h2>socials</h2>
          </div>
          <div class="navButton">
            <h2>contact</h2>
          </div>
        </div>
      </div>
      <hr style="margin-top: 24px; margin-bottom: 24px;">
      <div class="contentBody">
        <h2>Test</h2>
      </div>
      <hr style="margin-top: 24px; margin-bottom: 24px;">
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

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    padding: 32px;

    max-width: 1228px;

    .contentBody {
      height: 100%;
      flex-grow: 1;
    }

    .header {
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .navbar {
        display: flex;
        flex-direction: row;

        gap: 32px;

        .navButton {
          cursor: pointer;
          transition: 0.2s;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style>