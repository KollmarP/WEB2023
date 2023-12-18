
<script setup lang="ts">
import { ref } from 'vue';
import { type User, getUsers, deleteUser } from '@/model/users';
import { getSession } from '@/model/session';


const session = getSession();
const items = ref<User[]>();
setUsers();
async function setUsers(){
    const result = await getUsers().then(result => result.data);
    items.value = result;
    console.log(items.value)
}

const focus = ref<User>();
const editMenuOpen = ref(false);

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
    <div class="flyout">
        <slot>
            <nav class="panel is-info">
                <p class="panel-heading has-text-centered is-size-3">
                    Admin Menu
                </p>
                <p class="panel-tabs">
                    <a class="is-active">All</a>
                    <a>Distance</a>
                    <a>Strength</a>
                </p>
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <input class="input is-info" type="text" placeholder="Search">
                        <span class="icon is-left">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
                <div class="panel-block" v-for="(user, index) in items" key="index">
                    <span class="icon">
                        <img :src = "user?.photo" alt = ""/>
                    </span>
                    User: {{ user.firstName }} {{ user.lastName }}/n
                    {{ user.email }}
                </div>
            </nav>
        </slot>
    </div>
</template>

<style scoped>
.flyout {
    position: fixed;
    height: calc(100vh - 70px);
    width:20rem;
    top: 70px;
    left: -18rem;
    background-color: white;
    border-left: 1px solid #ccc;
    box-shadow: 0 0 1rem #0004;
    transition: left 0.5s ease-in-out;
    z-index: 100;
}

.flyout:hover, .flyout.is-active {
    left: 0;
    
}

</style>
