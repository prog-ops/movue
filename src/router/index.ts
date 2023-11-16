// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MovieList from 'components/MovieList.vue';
import MovieDetail from 'components/MovieDetail.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MovieList',
    component: MovieList,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/movie',
    name: 'MovieDetailAdd',
    component: MovieDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
