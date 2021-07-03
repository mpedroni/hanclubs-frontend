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
    path: '/teams/new',
    name: 'Novo Clube',
    component: () => import(/* webpackChunkName: "new-team" */ '@/views/Teams/New'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
