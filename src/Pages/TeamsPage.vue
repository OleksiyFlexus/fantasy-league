<template>
    <router-view></router-view>
    <div class="common_container">  
        <SearchBar placeholder-text="Пошук команди"/>
        <CreateTeamSection :teams="teams" @team-created="addTeamToList" />
        <TeamsTable />
        <DataBaseItemsList :items="teams" item-type="team" />
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { findAllTeamInDb } from '@/api/team';
import SearchBar from '@/components/SearchBar.vue';
import CreateTeamSection from '@/components/team/CreateTeamSection.vue';
import TeamsTable from '@/components/TableHeader.vue'
import DataBaseItemsList from '@/components/DataBaseItemsList.vue';

const teams = ref([]);

const findAllTeams = async () => {
  try {
    const teamDocs = await findAllTeamInDb();
    if (teamDocs.empty) {
      console.log('Гравців не знайдено в БД');
    } else {
      teams.value = teamDocs.map(doc => doc);
    }
  } catch (error) {
    console.error("Помилка при завантаженні данних гравців:", error);
  }
};

const addTeamToList = (newTeam) => {
  teams.value.push(newTeam);
};

onMounted(async () => {
  await findAllTeams();
});

</script>

<style scoped>

</style>