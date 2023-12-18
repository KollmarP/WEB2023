
<script setup lang="ts">
import { ref } from 'vue';
import { type User, getUsers, deleteUser } from '@/model/users';
import { getSession } from '@/model/session';


const session = getSession();
const items = ref<User[]>();
setUsers();
async function setUsers(){
    console.log( await getUsers())
    const users = await getUsers().then((result) => {
        items.value = result;
    })
    console.log(items.value)
}

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
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <input class="input is-info" type="text" placeholder="Search">
                        <span class="icon is-left">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
                <div class="panel-block" v-for="item in items" ref="items">
                    <span class="panel-icon">
                        {{ item.photo }}
                    </span>
                    User: {{ item.firstName }}
                </div>
                <a class="panel-block is-active">
                    <span class="panel-icon">
                        <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    bulma
                </a>
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
