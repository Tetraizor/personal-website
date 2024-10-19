<template>
  <div class="aboutSubView">
    <h1>future</h1>
    <p>
      Like always, I'll always have some projects in mind that will plague my
      mind. As for some of my more short-term goals are:
    </p>
    <ul style="margin-bottom: 2rem">
      <li>Finish this website :O</li>
      <li>
        Write more
        <span
          class="linkToPage"
          @click.prevent="navigationStore.changePageByName('blog')"
        >
          <div class="cover">
            /blog&nbsp;
            <i
              class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"
            ></i>
          </div>
          <span>posts&nbsp;</span>
          <i class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"></i>
        </span>
      </li>
      <li>Finish my drawing app</li>
      <li>Try making a basic game engine</li>
      <li>Learn more about graphics programming</li>
      <li>Study networking</li>
    </ul>
    <p>
      Follow here for my experiences with those. Thanks for your time, hope you
      enjoy here :)
    </p>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";

export default {
  name: "FutureView",
  props: [],
  components: {},

  data() {
    return {
      navigationStore: useNavigationStore(),
    };
  },
};
</script>

<style scoped lang="scss"></style>
