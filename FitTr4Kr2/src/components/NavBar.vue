<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoginBadge from './LoginBadge.vue';
import ExerciseMenu from './ExerciseMenu.vue';
import { getSession, useLogin } from '../model/session'

const isActive = ref(false);
const isExerciseMenuOpen = ref(false);

const session = getSession()

</script>

<template>
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
        <RouterLink class="navbar-item" to="/activity">Your Activities</RouterLink>
        <RouterLink class="navbar-item" to="/friends">Friends Activities</RouterLink>
        <RouterLink class="navbar-item" to="/admin" v-if="session.user?.role == 'admin'">Adimn</RouterLink>
        
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
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
          <LoginBadge />
        </div>
      </div>
    </div>
  </nav>
  <ExerciseMenu  :class="{ 'is-active': isExerciseMenuOpen }">
  </ExerciseMenu>
</template>


<style scoped>

.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #00d1b2;
}
</style>