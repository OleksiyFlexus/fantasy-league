<template>
    <router-view></router-view>
    <div class="common_container">
        <SearchBar placeholderText="Пошук команд" @update:search="handleSearch" />
        <div v-if="error" class="error_message">
            {{ error }}
        </div>
        <div class="createItemSection">
            <CreateTeamSection :search-query="searchQuery" @team-created="addTeamToList" />
            <p>Показано результатів: {{ filteredTeams.length }}</p>
        </div>
        <TeamsTable />
        <DataBaseItemsList :items="filteredTeams" itemType="team" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { findAllTeamInDb } from '@/api/team';
import SearchBar from '@/components/SearchBar.vue';
import CreateTeamSection from '@/components/team/CreateTeam.vue';
import TeamsTable from '@/components/TableHeader.vue';
import DataBaseItemsList from '@/components/DataBaseItemsList.vue';

const teams = ref([]);
const searchQuery = ref('');
const error = ref(null);

const findAllTeams = async () => {
    try {
        const teamsFromDb = await findAllTeamInDb();
        teams.value = teamsFromDb;
        sessionStorage.setItem('teams', JSON.stringify(teamsFromDb));
    } catch (err) {
        error.value = "Виникла помилка при завантаженні даних команд. Спробуйте ще раз.";
    }
};

const addTeamToList = (newTeam) => {
    teams.value.push(newTeam);
};

const filteredTeams = computed(() => {
    return teams.value.filter(team =>
        team.teamName && team.teamName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const handleSearch = (query) => {
    searchQuery.value = query;
};

onMounted(async () => {
    await findAllTeams();
});
</script>

<style>
.createItemSection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.createItemSection p {
    font-weight: 700;
}
</style>