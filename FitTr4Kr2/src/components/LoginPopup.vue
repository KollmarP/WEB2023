<script setup lang="ts">

  import { serverLogin, getSession, showError } from '@/model/session';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const email = ref('');
  const password = ref('');

  function login() {
    serverLogin(email.value, password.value)
      .then((user) => {
      router.push('/');
    })
  }


</script>

<template>
  <div class="form">
    <h2 class="subtitle">Please enter your credentials</h2>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
