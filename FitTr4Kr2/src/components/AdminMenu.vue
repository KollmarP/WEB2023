
<script setup lang="ts">
import { ref, computed } from 'vue';
import { type User, getUsers, userSearch, deleteUser } from '@/model/users';
import { getSession } from '@/model/session';
import { OAutocomplete } from '@oruga-ui/oruga-next';


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
//Oruga components
const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const data = ref<User[]>();
const selected = ref<User | null>(null);
const user = ref("");

async function getAsyncData(_input) {
    if (user.value !== _input) {
        user.value = _input;
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
    }

    // String cleared
    if (!_input.length) {
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
        return;
    }

    // Reached last page
    if (page.value > totalPages.value) {
        return;
    }

    isFetching.value = true;
    try {
        const _data = await userSearch(_input).then((response) => response);

        data.value = _data;
    } catch (err) {
        console.error(err);
    } finally {
        isFetching.value = false;
    }
}

function getMoreAsyncData() {
    getAsyncData(user.value);
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
                        <section>
                            <o-field label="Find a movie">
                                <o-autocomplete
                                    :data="data"
                                    placeholder="e.g. Fight Club"
                                    field="title"
                                    :loading="isFetching"
                                    check-scroll
                                    open-on-focus
                                    :debounce="500"
                                    @input="getAsyncData"
                                    @select="(option: User) => (selected = option)"
                                    @scroll-end="getMoreAsyncData">
                                    <template #default="users">
                                        <div class="media">
                                            <div class="media-left">
                                                <img
                                                    width="32"
                                                    :src="users.option.img" />
                                            </div>
                                            <div class="media-content">
                                                {{ users.option.firstName }} {{ users.option.lastName }}
                                                <br />
                                                <small>
                                                    Email: {{ users.option.email }}
                                                </small>
                                            </div>
                                        </div>
                                    </template>
                                </o-autocomplete>
                            </o-field>
                            <p><b>Selected:</b> {{ selected }}</p>
                        </section>
                    </p>
                </div>
                <div class="panel-block" v-for="(user, index) in items" key="index">
                    <span class="icon">
                        <img :src = "user?.photo" alt = ""/>
                    </span>
                    User: {{ user.firstName }} {{ user.lastName }} <br>
                    Email: {{ user.email }}
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