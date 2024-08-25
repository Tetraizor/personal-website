import { defineStore } from "pinia";
import router from "@/router";

export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    page: "me" as string,
    canTransitionStack: 0 as number,
  }),
  actions: {
    changePage(name: string) {
      this.page = name;
    },
    increaseTransitionStack() {
      this.canTransitionStack++;
    },
    decreaseTransitionStack() {
      this.canTransitionStack--;
    },
  },
  getters: {
    canTransition(): boolean {
      return this.canTransitionStack === 0;
    },
  },
});
