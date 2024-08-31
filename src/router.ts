import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import { switchPageInit } from "./stores/navigationStore";

// Main Views
import MainView from "./views/MainView.vue";
import ConstructionView from "./views/ConstructionView.vue";

// "MainView" Children
import MeView from "./views/Main/MeView.vue";
import BlogView from "./views/Main/BlogView.vue";
import ProjectsView from "./views/Main/ProjectsView.vue";
import GamesView from "./views/Main/GamesView.vue";

// "MeView" Children
import AboutView from "./views/Main/Me/AboutView.vue";
import ContactView from "./views/Main/Me/ContactView.vue";
import SocialsView from "./views/Main/Me/SocialsView.vue";

const pages = [
  {
    name: "me",
    route: "/",
    subPages: [
      {
        name: "about",
        route: "",
      },
      {
        name: "contact",
        route: "contact",
      },
      {
        name: "socials",
        route: "socials",
      },
    ],
  },
  {
    name: "games",
    route: "/games",
    subPages: [],
  },
  {
    name: "blog",
    route: "/blog",
    subPages: [],
  },
  {
    name: "projects",
    route: "/projects",
    subPages: [],
  },
];

// Default routes to be used when the page is suitable for public viewing.
const defaultRoutes = [
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: "",
        name: "me",
        component: MeView,
        children: [
          {
            path: "/",
            name: "about",
            component: AboutView,
          },
          {
            path: "/contact",
            name: "contact",
            component: ContactView,
          },
          {
            path: "/socials",
            name: "socials",
            component: SocialsView,
          },
        ],
      },
    ],
  },
  {
    path: "/games",
    component: MainView,
    children: [
      {
        path: "",
        name: "games",
        component: GamesView,
      },
    ],
  },
  {
    path: "/projects",
    component: MainView,
    children: [
      {
        path: "",
        name: "projects",
        component: ProjectsView,
      },
    ],
  },
  {
    path: "/blog",
    component: MainView,
    children: [
      {
        path: "",
        name: "blog",
        component: BlogView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    redirect: "/",
  },
];

// Is used when the page is under construction.
const constructionRoutes = [
  {
    path: "/",
    name: "construction",
    component: ConstructionView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "constructionRedirect",
    redirect: "/",
  },
];

const router = createRouter({
  history:
    import.meta.env.PUBLIC_IS_GH_PAGES == "true"
      ? createWebHashHistory()
      : createWebHistory(),
  routes:
    import.meta.env.PUBLIC_IS_UNDER_CONSTRUCTION == "true"
      ? constructionRoutes
      : defaultRoutes,
});

export function switchPage(page: string, subPage: string = "") {
  let link = "";

  const selectedPage = pages.find((p) => p.name === page);

  if (selectedPage == null || selectedPage == undefined) {
    return;
  }

  link = selectedPage.route;

  const selectedSubPage = selectedPage?.subPages.find(
    (sp) => sp.name === subPage
  );

  if (selectedSubPage != null && selectedSubPage != undefined) {
    link += selectedSubPage.route;
  }

  console.log(link);

  router.push(link);
}

export default router;

switchPageInit(switchPage);
