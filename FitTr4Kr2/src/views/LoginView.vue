<script setup lang="ts">

  import { serverLogin, getSession } from '@/model/session';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const session = getSession();
  const email = ref('');
  const password = ref('');

  function login() {
    serverLogin(email.value, password.value).then((user) => {
      if(user.email === null || user === undefined){
        return("User not found");
      }
      router.push('/');
    })
  }


</script>

<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="form">
          <h1 class="title">Login</h1>
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
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
