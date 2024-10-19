<template>
  <div class="aboutSubView">
    <h1>present</h1>
    <p>
      CS student, working as part-time full-stack web developer. I like to spend
      my time diving into new topics, mostly software, ui and art related. Big
      on optimization and developing modular systems for games or other things
      alike. Number one over-engineering fan. Love video games and art thingies.
    </p>
    <p>
      Here, you’ll find everything that reflects who I am, from the topics I
      explore, my
      <span
        class="linkToPage"
        @click.prevent="navigationStore.changePageByName('blog')"
      >
        <div class="cover">
          /blog&nbsp;
          <i class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"></i>
        </div>
        <span> thoughts </span>
        <i class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"></i>
      </span>
      and
      <span
        class="linkToPage"
        @click.prevent="navigationStore.changePageByName('projects')"
      >
        <div class="cover">
          /projects&nbsp;
          <i class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"></i>
        </div>
        <span>&nbsp;previous works&nbsp;</span>
        <i
          class="fa-sharp fa-solid fa-xs fa-arrow-up-right-from-square"
        ></i> </span
      >, to other relevant things you might want to know.
    </p>
    <p>
      Really like to hear others perspectives on topics I’m passionate about.
      Feel free to contact me to discuss anything you want.
    </p>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";

export default {
  name: "PresentView",
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
