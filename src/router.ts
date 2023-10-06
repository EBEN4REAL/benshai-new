import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Cities from './views/Cities.vue';
import CityDetail from "./views/CityDetail.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Cities',
    component: Cities,
  },
  {
    path: '/City/:city',
    name: 'CityDetail',
    component: CityDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;