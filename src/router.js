
import { createRouter, createWebHistory } from 'vue-router';
import process from "process";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/PlayList.vue')
  },
  {
    path: '/play/:video_id',
    name: 'Play',
    component: () => import('./views/PlayView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
