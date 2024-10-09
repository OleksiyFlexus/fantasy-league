<template>
    <router-view></router-view>
    <div class="common_container">
        <EventBackground />
        <div v-if="error" class="error_message">
            {{ error }}
        </div>
        <Event :teams="teams" :is-timer-running="isTimerRunning" @team-selected="handleTeamSelection" />
        <MatchTimer @timer-started="handleTimerStarted" @timer-stopped="handleTimerStopped" />
        <Protocol :left-team="leftTeam" :right-team="rightTeam" />
        <ProtocolPlayerItem />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Event from '@/components/match/Event.vue';
import EventBackground from '@/components/match/EventBackground.vue';
import MatchTimer from '@/components/match/MatchTimer.vue';
import Protocol from '@/components/match/Protocol.vue';
import ProtocolPlayerItem from '@/components/player/ProtocolPlayerItems.vue';
import { findAllTeamInDb } from '@/api/team';
import { useModalWindow } from '@/helpers/useModalWindow';

const teams = ref([]);
const error = ref(null);
const isTimerRunning = ref(false);
const leftTeam = ref({});
const rightTeam = ref({});
const currentTeamSide = ref('');

const { openModal } = useModalWindow();

const loadTeams = async () => {
    const storedTeams = JSON.parse(sessionStorage.getItem('teams'));
    if (storedTeams) {
        teams.value = storedTeams;
        leftTeam.value = JSON.parse(sessionStorage.getItem('leftTeam')) || {};
        rightTeam.value = JSON.parse(sessionStorage.getItem('rightTeam')) || {};
    } else {
        await findAllTeams();
    }
};

const findAllTeams = async () => {
    try {
        const teamsFromDb = await findAllTeamInDb();
        teams.value = teamsFromDb;
        sessionStorage.setItem('teams', JSON.stringify(teamsFromDb));
    } catch (err) {
        error.value = "Виникла помилка при завантаженні даних команд. Спробуйте ще раз.";
    }
};

const handleTeamSelection = (team, side) => {
    if (side === 'left') {
        leftTeam.value = team;
        sessionStorage.setItem('leftTeam', JSON.stringify(team));
    } else if (side === 'right') {
        rightTeam.value = team;
        sessionStorage.setItem('rightTeam', JSON.stringify(team));
    }
    openModal();
};

const handleTimerStarted = () => {
    isTimerRunning.value = true;
};

const handleTimerStopped = () => {
    isTimerRunning.value = false;
};

onMounted(async () => {
    await loadTeams();
});
</script>