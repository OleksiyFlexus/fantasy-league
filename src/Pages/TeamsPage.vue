<template>
    <router-view></router-view>
    <div class="common_container">  
        <SearchBar placeholder-text="Пошук команди"/>
        <CreateTeamSection />
        <TeamsTable />
        <TeamCardLogo />
    </div>

</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import CreateTeamSection from '@/components/team/CreateTeamSection.vue';
import TeamsTable from '@/components/TableHeader.vue'
import TeamCardLogo from '@/components/team/TeamCardLogo.vue';



</script>

<style scoped>

</style>