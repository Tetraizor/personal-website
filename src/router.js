import { createRouter, createWebHistory } from 'vue-router';

// Main Views
import MainView from './views/MainView.vue';
import ConstructionView from './views/ConstructionView.vue';

// "MainView" Children
import MeView from './views/Main/MeView.vue';
import BlogView from './views/Main/BlogView.vue';
import ProjectsView from './views/Main/ProjectsView.vue';
import GamesView from './views/Main/GamesView.vue';

// "MeView" Children
import AboutView from './views/Main/Me/AboutView.vue';
import ContactView from './views/Main/Me/ContactView.vue';
import SocialsView from './views/Main/Me/SocialsView.vue';

// Default routes to be used when the page is suitable for public viewing.
const defaultRoutes = [
  {
    path: '/',
    component: MainView,
    children: [
      {
        path: '',
        name: 'me',
        component: MeView,
        children: [
          {
            path: '/',
            name: 'about',
            component: AboutView,
          },
          {
            path: '/contact',
            name: 'contact',
            component: ContactView,
          },
          {
            path: '/socials',
            name: 'socials',
            component: SocialsView,
          }
        ]
      },
    ]
  },
  {
    path: '/games',
    component: MainView,
    children: [
      {
        path: '',
        name: 'games',
        component: GamesView,
      },
    ]
  },
  {
    path: '/projects',
    component: MainView,
    children: [
      {
        path: '',
        name: 'projects',
        component: ProjectsView,
      },
    ]
  },
  {
    path: '/blog',
    component: MainView,
    children: [
      {
        path: '',
        name: 'blog',
        component: BlogView,
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: "/"
  },
];

// Is used when the page is under construction.
const constructionRoutes = [
  {
    path: '/',
    name: 'construction',
    component: ConstructionView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'constructionRedirect',
    redirect: "/"
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: import.meta.env.PUBLIC_IS_UNDER_CONSTRUCTION == "true" ? constructionRoutes : defaultRoutes,
});

export default router;