import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/platforms',
      name: 'platforms',
      component: () => import('./views/Platforms.vue'),
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('./views/Games.vue'),
    },
    {
      path: '/platforms/:abb',
      name: 'gamesbyplatform',
      component: () => import('./views/Games.vue'),
    },
    {
      path: '/games/:id',
      name: 'gameoverview',
      component: () => import('./views/GameOverview.vue'),
    }
  ],
});