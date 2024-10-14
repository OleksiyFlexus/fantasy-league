<template>
    <router-view />
    <div class="common_container">
        <TeamProfileHeader :team="selectedTeam" />
        <TeamProfileStatisitc />
        <TeamProfilePlayersCards />
        <TeamProfilePlayersList :players="selectedTeamPlayers" />
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findAllTeamInDb } from '@/api/team.js';
import { findPlayersByTeamId } from '@/api/player';
import TeamProfileHeader from '@/components/team/TeamProfileHeader.vue';
import TeamProfilePlayersList from '@/components/team/TeamProfilePlayersList.vue';
import TeamProfilePlayersCards from '@/components/team/TeamProfilePlayersCards.vue';
import TeamProfileStatisitc from '@/components/team/TeamProfileStatisitc.vue';

const teams = ref([]);
const selectedTeamPlayers = ref([]);
const selectedTeam = ref(null);
const error = ref(null);

const route = useRoute();
const teamName = decodeURIComponent(route.params.teamName);

const findAllTeams = async () => {
    try {
        const teamsFromDb = await findAllTeamInDb();
        teams.value = teamsFromDb;
        selectedTeam.value = teams.value.find(t => t.teamName === teamName) || null;
        if (selectedTeam.value) {
            selectedTeamPlayers.value = await findPlayersByTeamId(selectedTeam.value.id);
            if (selectedTeamPlayers.value.length === 0) {
                console.warn('Игроков нет или запрос не вернул данных');
            }
        } else {
            error.value = `Команда "${teamName}" не найдена`;
        }
    } catch (err) {
        error.value = "Помилка при завантаженні даних команд.";
        console.error('Ошибка при загрузке команды или игроков:', err);
    }
};

onMounted(() => {
    findAllTeams();
});
</script>

<style scoped></style>