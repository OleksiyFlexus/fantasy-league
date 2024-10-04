<template>
    <header class="header">
        <router-link to="/home" class="header__container">
            <LogoIcon />
        </router-link>
    </header>
</template>


<script setup>
import { LogoIcon } from '@/constants/importIcons';
</script>

<style scoped>
.header {
    width: 100%;
    height: 70px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.header__container {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 25px;
    justify-content: center;
}

</style>