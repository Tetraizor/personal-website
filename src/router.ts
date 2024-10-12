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
import NavigationPage from "./models/NavigationPage";

// "BlogView" Children
import PostView from "./views/Main/Blog/PostView.vue";
import DefaultPostView from "./views/Main/Blog/DefaultPostView.vue";

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
        path: "db",
        name: "db",
        component: GamesView,
      },
    ],
  },
  {
    path: "/projects",
    component: MainView,
    children: [
      {
        path: "projects",
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
        children: [
          {
            path: "",
            name: "defaultPostView",
            component: DefaultPostView,
          },
          {
            path: ":slug",
            name: "post",
            component: PostView,
            props: true,
          },
        ],
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
    import.meta.env.PUBLIC_ENABLE_HASH_ROUTING == "true"
      ? createWebHashHistory()
      : createWebHistory(),
  routes:
    import.meta.env.PUBLIC_IS_UNDER_CONSTRUCTION == "true"
      ? constructionRoutes
      : defaultRoutes,
});

export function switchPage(page: NavigationPage): void {
  let currentPage: NavigationPage | null = page;
  let link = currentPage.route || "";

  while (currentPage !== null) {
    const parent = currentPage.getParent();

    if (parent !== undefined && parent !== null) {
      const parentRoute = parent.route;
      link = parentRoute + link;
    }

    currentPage = parent;
  }

  router.push({
    path: link,
  });
}

export default router;

switchPageInit(switchPage);
