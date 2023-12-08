<script setup lang="ts">
  import { getSession, useLogin } from '@/model/session';
  import LoginView from '@/views/LoginView.vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const session = getSession();
  const isLoginViewOpen = ref(false);
  
  function logout() {
    session.user = null;
    router.push('/login');
  }
</script>

<template>
  <div class="has-text-right" v-if="session.user">
    Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
    <small>
      {{ session.user.email }}
      <a class="button is-small is-light is-warning" @click.prevent="logout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </a>
    </small>
  </div>
  <div class="buttons" v-else>
    <a class="button is-primary">
      <strong>Sign up</strong>
    </a>
    <a class="button" :class="{ 'is-active': LoginView }" @click.prevent="isLoginViewOpen = !isLoginViewOpen">
      Login
    </a>
  </div>
  <LoginView  :class="{ 'is-active': isLoginViewOpen }">
  </LoginView>
</template>


<style scoped>

</style>
