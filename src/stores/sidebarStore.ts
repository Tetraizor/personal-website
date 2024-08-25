import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    open() {
      if (this.isOpen) return;
      this.toggle();
    },
    close() {
      if (!this.isOpen) return;
      this.toggle();
    },
  },
});
