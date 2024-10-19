export default class NavigationPage {
  name: string;
  hideCross?: boolean;
  children?: NavigationPage[];
  redirect?: string;
  route?: string;

  constructor(
    name: string,
    redirect: string = "",
    route: string = "",
    hideCross: boolean = false,
    children: NavigationPage[] = []
  ) {
    this.name = name;
    this.route = route;
    this.children = children;
    this.hideCross = hideCross;
    this.redirect = redirect;
  }

  parent: NavigationPage | null = null;

  getParent() {
    if (this.parent === null) {
      getChildrenRecursive().forEach((p) => {
        if (p.children?.includes(this)) {
          this.parent = p;
        }
      });
    }

    return this.parent;
  }

  setParent(parent: NavigationPage) {
    this.parent = parent;
  }
}

export const pages: NavigationPage[] = [
  new NavigationPage("me", "present", "/", false, [
    new NavigationPage("past", "", "past", false, []),
    new NavigationPage("present", "", "present", false, []),
    new NavigationPage("future", "", "future", false, []),
  ]),
  new NavigationPage("projects", "", "/projects", true),
  new NavigationPage("blog", "defaultPostView", "/blog", true, [
    new NavigationPage("defaultPostView", "", "", true, []),
    new NavigationPage("post", "", "*", true, []),
  ]),
  new NavigationPage("games", "db", "/games", false, [
    new NavigationPage("db", "", "/db", false, []),
  ]),
];

const _pagesFlat: NavigationPage[] = [];
export function getPagesFlat(): NavigationPage[] {
  if (_pagesFlat.length === 0) {
    _pagesFlat.push(...getChildrenRecursive());
  }

  return _pagesFlat;
}

export function isPageInStack(pageName: string): boolean {
  const pagesFlat = getPagesFlat();

  for (let i = 0; i < pagesFlat.length; i++) {
    if (pagesFlat[i].name === pageName) {
      return true;
    }
  }

  return false;
}

export function getPageByName(name: string): NavigationPage {
  const pageListFlat = getPagesFlat();

  for (const p of pageListFlat) {
    if (p.name === name) {
      return p;
    }
  }

  return pages[0];
}

export function getPageByUrl(): NavigationPage {
  const pageNames = window.location.pathname.split("/").filter((p) => p !== "");

  if (pageNames.length === 0) {
    return getPageByName("about");
  }
  if (pageNames.length === 1) {
    return getPageByName(pageNames[0]) || getPageByName("about");
  }

  let page: NavigationPage | null = null;
  for (let i = pageNames.length - 1; i >= 0; i--) {
    page = isPageInStack(pageNames[i]) ? getPageByName(pageNames[i]) : null;

    if (page != null) {
      return page;
    }

    if (i == 0) return getPageByName("about");
    if (page == null && getPageByName(pageNames[i - 1]) != null) {
      const page = new NavigationPage(pageNames[i], "", pageNames[i], true, []);
      page.setParent(getPageByName(pageNames[i - 1]));
      return page;
    }
  }
  return page || getPageByName("about");
}

export function getChildrenRecursive(
  page: NavigationPage | null = null
): NavigationPage[] {
  let pageList: NavigationPage[] = [];

  if (page === null) {
    for (const p of pages) {
      pageList.push(...getChildrenRecursive(p));
    }
  } else {
    pageList.push(page);
    for (const c of page.children ?? []) {
      pageList.push(...getChildrenRecursive(c));
    }
  }

  return pageList;
}
