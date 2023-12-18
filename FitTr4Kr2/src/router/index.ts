import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FriendsView from '../views/FriendsView.vue';
import ExerciseStats from '../views/ExerciseStats.vue';
import { getSession } from '@/model/session';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stats",
      name: "stats",
      component: ExerciseStats,
      beforeEnter: requireLogin,
    },
    {
      path: "/friends",
      name: "map",
      component: FriendsView,
      beforeEnter: requireLogin,
    },
  ],
});

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user){
    session.redirectUrl = to.fullPath;
    next('/login');
  }else{
    next();
  }
}

export default router