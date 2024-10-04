<template>
    <router-view></router-view>
    <div class="pageNf">
        <Error404 />
    </div>
</template>

<script setup>
import { Error404 } from '@/constants/importIcons';


</script>

<style scoped>
.pageNf {
    padding-top: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (min-width: 425px) {
    .pageNf {
        padding: 0;
    }
}
</style>