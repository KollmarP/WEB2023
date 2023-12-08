
<script setup lang="ts">
import { ref } from 'vue';
import { type User, getUsers, deleteUser } from '@/model/users';
import { getSession } from '@/model/session';


const session = getSession();


let num = ref(0);



const items = ref<User[]>([]);
 getUsers().then((data) => {
     items.value = data;
 });

function deleteUsers(user : User){
    if(user === null || user === undefined){
        return;
    }
    else{
        //deleteUser(user);
    }
}


</script>

<template>

</template>



<style scoped>

</style>
