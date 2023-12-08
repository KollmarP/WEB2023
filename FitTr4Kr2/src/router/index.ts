import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue';
import FriendsView from '../views/FriendsView.vue';
import ExercisesView from '../views/ExercisesView.vue';
import { getSession } from '@/model/session';
import ExercisesVue from '@/components/Exercises.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { 
      path: "/login", 
      name: "login", 
      component: LoginView 
    },
    { 
      path: "/admin", 
      name: "admin", 
      component: AdminView
    },    
    { 
      path: "/friends", 
      name: "friends", 
      component: FriendsView
    },  
    { 
      path: "/exercises", 
      name: "exercises", 
      component: ExercisesView
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