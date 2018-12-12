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
      path: '/games/add',
      name: 'addgame',
      component: () => import('./views/GameAdd.vue'),
    },
    {
      path: '/games/edit/:id',
      name: 'editgame',
      component: () => import('./views/GameEdit.vue'),
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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/Register.vue'),
    }
  ],
});