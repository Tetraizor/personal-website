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
}

export const pages: NavigationPage[] = [
  new NavigationPage("me", "about", "/", false, [
    new NavigationPage("about", "", "about", false, []),
    new NavigationPage("contact", "", "contact", true, []),
    new NavigationPage("socials", "", "socials", true, []),
  ]),
  new NavigationPage("projects", "web", "/projects", true, [
    new NavigationPage("web", "", "/web", true, []),
    new NavigationPage("mobile", "", "/mobile", true, []),
    new NavigationPage("desktop", "", "/desktop", true, []),
  ]),
  new NavigationPage("blog", "posts", "/blog", false, [
    new NavigationPage("posts", "", "/posts", false, []),
    new NavigationPage("categories", "", "/categories", false, []),
  ]),
  new NavigationPage("games", "db", "/games", false, [
    new NavigationPage("db", "", "/db", false, []),
  ]),
];

const pagesFlat: NavigationPage[] = [];
export function getPagesFlat(): NavigationPage[] {
  if (pagesFlat.length === 0) {
    pagesFlat.push(...getChildrenRecursive());
  }

  return pagesFlat;
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
