<script setup lang="ts">



</script>

<template>
    <div class="flyout">
        <slot>
            <nav class="panel is-info">
                <p class="panel-heading has-text-centered is-size-3">
                    Exercise Menu
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
                <a class="panel-block is-active">
                    <span class="panel-icon">
                        <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    bulma
                </a>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    marksheet
                </a>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    minireset.css
                </a>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    jgthms.github.io
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
    right: -18rem;
    background-color: white;
    border-left: 1px solid #ccc;
    box-shadow: 0 0 1rem #0004;
    transition: right 0.5s ease-in-out;
    z-index: 100;
}

.flyout:hover, .flyout.is-active {
    right: 0;
    
}

</style>