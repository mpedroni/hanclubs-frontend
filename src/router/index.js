import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/teams',
    name: 'Clubes Cadastrados',
    component: () => import(/* webpackChunkName: "teams" */ '@/views/Teams'),
  },
  {
    path: '/teams/new',
    name: 'Novo Clube',
    component: () => import(/* webpackChunkName: "new-team" */ '@/views/Teams/New'),
  },
  {
    path: '/partners',
    name: 'Sócios Cadastrados',
    component: () => import(/* webpackChunkName: "partners" */ '@/views/Partners'),
  },
  {
    path: '/partners/new',
    name: 'Novo Sócio',
    component: () => import(/* webpackChunkName: "new-partner" */ '@/views/Partners/New'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
