<script setup lang="ts">

  import { registerUser } from '@/model/session';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const photo = ref('');
  const password = ref('');
        
  function register() {
    registerUser(firstName.value, lastName.value, email.value, photo.value, password.value)
      .then(() => {
      router.push('/');
    })
  }

</script>

<template>
  <div class="form">
    <h2 class="subtitle">Create new account</h2>
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input class="input" type="name" v-model="firstName">
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input class="input" type="name" v-model="lastName">
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Photo (optional)</label>
      <div class="control">
        <input class="input" type="link" v-model="photo">
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
        <button class="button is-link" @click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
