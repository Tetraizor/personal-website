import { defineStore } from "pinia";

export const useScreenStore = defineStore("screen", {
  state: () => ({
    isMobile: false,
  }),
  actions: {
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
  },
});
