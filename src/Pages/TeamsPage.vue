<template>
    <router-view></router-view>
    <div class="common_container">  
        <SearchBar @update:search="handleSearch" placeholder-text="Пошук команди" />
        <CreateTeamSection :teams="teams" @team-created="addTeamToList" />
        <TeamsTable />
        <DataBaseItemsList :items="filteredTeams" itemType="team" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { findAllTeamInDb } from '@/api/team';
import SearchBar from '@/components/SearchBar.vue';
import CreateTeamSection from '@/components/team/CreateTeamSection.vue';
import TeamsTable from '@/components/TableHeader.vue';
import DataBaseItemsList from '@/components/DataBaseItemsList.vue';

const teams = ref([]);
const searchQuery = ref('');

const findAllTeams = async () => {
  try {
    const teamDocs = await findAllTeamInDb();
    if (teamDocs.empty) {
      console.log('Команди не знайдено в БД');
    } else {
      teams.value = teamDocs.map(doc => doc);
    }
  } catch (error) {
    console.error("Помилка при завантаженні даних команд:", error);
  }
};

const addTeamToList = (newTeam) => {
  teams.value.push(newTeam);
};

const filteredTeams = computed(() => {
  return teams.value.filter(teamName => 
    teamName.name && teamName.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

onMounted(async () => {
  await findAllTeams();
});
</script>

<style scoped>

</style>