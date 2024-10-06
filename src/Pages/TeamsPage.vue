<template>
    <router-view></router-view>
    <div class="common_container">  
        <SearchBar placeholder-text="Пошук команди"/>
        <TeamsDataSection />
        <TeamsTable />
    </div>

</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import TeamsDataSection from '@/components/team/TeamsDataSection.vue';
import TeamsTable from '@/components/TableHeader.vue'



</script>

<style scoped>

</style>