<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ExerciseMenu from './ExerciseMenu.vue';
import AdminMenu from './AdminMenu.vue';
import LoginPopup from './LoginPopup.vue'
import { getSession } from '@/model/session';
import RegisterPopup from './RegisterPopup.vue';

const isActive = ref(false);
const isAdminMenuOpen = ref(false);
const isExerciseMenuOpen = ref(false);

const session = getSession()
const router = useRouter();
const isLoginViewOpen = ref(false);
const isRegViewOpen = ref(false);

function logout() {
  isLoginViewOpen.value = false;
  session.user = null;
}

</script>

<template>
  <div v-if = session.user?.isAdmin>
    <AdminMenu  :class="{ 'is-active': isAdminMenuOpen }">
    </AdminMenu>
  </div>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/" >
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="28" height="28" />

      </RouterLink>
      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/stats">Your Activities</RouterLink>
        <RouterLink class="navbar-item" to="/friends">Friends Activities</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <a class="button" :class="{ 'is-active': isExerciseMenuOpen }" @click.prevent="isExerciseMenuOpen = !isExerciseMenuOpen">
            <span class="icon">
              <i class="fas fa-weight-hanging"></i>
            </span>
          </a>
        </div>
        <div class="navbar-item">
          <div class="has-text-right" v-if="session.user">
            Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
            <small>
              {{ session.user.email }}
            </small>
            <a class="button is-small is-light is-warning" @click.prevent="logout">
              <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
              </span>
            </a>
          </div>
          <div class="buttons" v-else>
            <a class="button is-primary" :class="{ 'is-active': isRegViewOpen }" @click.prevent="isRegViewOpen = true">
              <strong>Sign up</strong>
            </a>
            <a class="button" :class="{ 'is-active': isLoginViewOpen }" @click.prevent="isLoginViewOpen = true">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <ExerciseMenu  :class="{ 'is-active': isExerciseMenuOpen }">
  </ExerciseMenu>
  <div class="modal" :class = "{'is-active': isLoginViewOpen && !session.user}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
        <button class="delete" aria-label="close" @click.prevents="isLoginViewOpen = false"></button>
      </header>
      <section class="modal-card-body">
        <LoginPopup/>
      </section>
    </div>
  </div>
  <div class="modal" :class = "{'is-active': isRegViewOpen && !session.user}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
        <button class="delete" aria-label="close" @click.prevents="isRegViewOpen = false"></button>
      </header>
      <section class="modal-card-body">
        <RegisterPopup/>
      </section>
    </div>
  </div>
</template>


<style scoped>

.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #00d1b2;
}
</style>