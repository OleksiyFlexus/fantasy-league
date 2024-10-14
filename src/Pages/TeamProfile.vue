<template>
    <router-view></router-view>
    <div class="common_container">
        <TeamProfileHeader :team="team" />
        <TeamProfileStatisitc />
        <TeamProfilePlayersCards />
        <TeamProfilePlayersList :players="players" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findAllTeamInDb } from '@/api/team.js';
import TeamProfileHeader from '@/components/team/TeamProfileHeader.vue';
import TeamProfilePlayersList from '@/components/team/TeamProfilePlayersList.vue';
import TeamProfilePlayersCards from '@/components/team/TeamProfilePlayersCards.vue';
import TeamProfileStatisitc from '@/components/team/TeamProfileStatisitc.vue';

const teams = ref([]);
const players = ref([]);
const team = ref(null);
const error = ref(null);

const route = useRoute();
const teamName = decodeURIComponent(route.params.teamName);

const findAllTeams = async () => {
    try {
        const teamsFromDb = await findAllTeamInDb();
        teams.value = teamsFromDb;
        team.value = teams.value.find(t => t.teamName === teamName) || null;
        if (!team.value) {
            error.value = `Команда "${teamName}" не найдена`;
        }
    } catch (err) {
        error.value = "Помилка при завантаженні даних команд.";
    }
};

onMounted(() => {
    findAllTeams();
});
</script>

<style></style>