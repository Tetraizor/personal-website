import { defineStore } from "pinia";

let switchPage: (page: string, subPage: string) => void;

export function switchPageInit(
  toCall: (page: string, subPage: string) => void
): void {
  switchPage = toCall;
}

export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    page: "me" as string,
    subPages: {
      me: "about",
      games: "games",
      blog: "blog",
      projects: "projects",
    } as Record<string, string>,
    canTransitionStack: 0 as number,
  }),
  actions: {
    changePage(page: string, subPage: string = "") {
      this.page = page;

      if (subPage !== "") {
        this.changeSubPage(page, subPage);
      } else {
        this.changeSubPage(page, this.subPages[page]);
      }
    },
    changeSubPage(page: string, subPage: string) {
      this.subPages[page] = subPage;
      switchPage(page, subPage);
    },
    increaseTransitionStack() {
      this.canTransitionStack++;
    },
    decreaseTransitionStack() {
      this.canTransitionStack--;
    },
    getSubPage(page: string): string {
      return this.subPages[page];
    },
  },
  getters: {
    canTransition(): boolean {
      return this.canTransitionStack === 0;
    },
  },
});
