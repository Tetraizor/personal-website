<template>
  <div class="aboutSubView">
    <h1>past</h1>
    <p>
      I've been doing programming related stuff since highschool. Been working
      professionally since 2021 at various programming jobs.
    </p>
    <p>
      As for personal projects go, you can find many of them from
      <span
        class="linkToPage"
        @click.prevent="navigationStore.changePageByName('projects')"
      >
        <div class="cover">
          /projects&nbsp;
          <i class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"></i>
        </div>
        <span>this page&nbsp;</span>
        <i class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"></i>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";

export default {
  name: "PastView",
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
