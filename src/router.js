
import { createRouter, createWebHistory } from 'vue-router';
import process from "process";

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'HomeView',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('./views/PlayList.vue')
  },
  {
    path: '/play/:video_id',
    name: 'Play',
    component: () => import('./views/PlayView.vue')
  },
  {
    path: '/play2/:video_id',
    name: 'Play2',
    component: () => import('./views/PlayPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
