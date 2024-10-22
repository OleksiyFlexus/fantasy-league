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
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import TeamProfileHeader from '@/components/Team/TeamProfileHeader.vue';
import TeamProfilePlayersList from '@/components/Team/TeamProfilePlayersList.vue';
import TeamProfilePlayersCards from '@/components/Team/TeamProfilePlayersCards.vue';
import TeamProfileStatisitc from '@/components/Team/TeamProfileStatisitc.vue';

const selectedTeamPlayers = ref([]);
const selectedTeam = ref(null);
const error = ref(null);
const route = useRoute();
const teamName = decodeURIComponent(route.params.teamName);

const findAllTeams = () => {
    const db = getDatabase();
    const teamsRef = dbRef(db, 'teams');
    onValue(teamsRef, (snapshot) => {
        const teamsFromDb = snapshot.val();
        if (teamsFromDb) {
            const teamsArray = Object.keys(teamsFromDb).map(key => ({
                id: key,
                ...teamsFromDb[key]
            }));
            selectedTeam.value = teamsArray.find(t => t.teamName === teamName) || null;
            if (selectedTeam.value) {
                findPlayersByTeamId(selectedTeam.value.id);
            } else {
                error.value = `Команда "${teamName}" не найдена`;
            }
        } else {
            error.value = "Команды не найдены в БД.";
        }
    }, (error) => {
        console.error('Ошибка при загрузке команд:', error);
        error.value = "Ошибка при загрузке команд.";
    });
};

const findPlayersByTeamId = (teamId) => {
    const db = getDatabase();
    const playersRef = dbRef(db, `teams/${teamId}/players`);
    onValue(playersRef, (snapshot) => {
        const playersData = snapshot.val();
        selectedTeamPlayers.value = playersData ? Object.keys(playersData).map(key => ({
            id: key,
            ...playersData[key]
        })) : [];
    }, (error) => {
        console.error('Ошибка при загрузке игроков:', error);
        error.value = "Ошибка при загрузке игроков.";
    });
};

onMounted(() => {
    findAllTeams();
});
</script>