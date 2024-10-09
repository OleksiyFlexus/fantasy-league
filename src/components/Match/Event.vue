<template>
    <div class="event__section">
        <div class="left__teamSection" @click="!props.isTimerRunning ? openTeamSelection('left') : null">
            <img :src="leftTeam.logo || defaultLogo" alt="left team logo">
            <p>{{ leftTeam.teamName || 'Выберите команду' }}</p>
        </div>
        <div class="middle__scoreSection">
            <div class="leftTeam__score">
                <p>0</p>
            </div>
            <div class="middleScore__section">
                <p>:</p>
            </div>
            <div class="rightTeam__score">
                <p>0</p>
            </div>
        </div>
        <div class="right__teamSection" @click="!props.isTimerRunning ? openTeamSelection('right') : null">
            <img :src="rightTeam.logo || defaultLogo" alt="right team logo">
            <p>{{ rightTeam.teamName || 'Выберите команду' }}</p>
        </div>

        <ModalWindow :isActive="isModalActive" @close="closeModal">
            <div class="teamSelectModalWindow">
                <h2>Выберите команду</h2>
                <div class="selectTeamSection">
                    <div v-if="teams.length === 0">Нет доступных команд</div>
                    <div v-for="team in teams" :key="team.id" @click="selectTeam(team)">
                        <TeamListItem :team="team" />
                    </div>
                </div>
            </div>
        </ModalWindow>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { useModalWindow } from '@/helpers/useModalWindow';
import ModalWindow from '@/components/ModalWindow.vue';
import TeamListItem from '@/components/team/TeamListItem.vue';
import defaultLogo from '@/assets/images/DefaultTeamLogo.png';

const props = defineProps({
    teams: Array,
    isTimerRunning: Boolean
});

const emit = defineEmits(['team-selected']);

const leftTeam = ref(JSON.parse(sessionStorage.getItem('leftTeam')) || {});
const rightTeam = ref(JSON.parse(sessionStorage.getItem('rightTeam')) || {});
const currentTeamSide = ref(null);

const { isModalActive, openModal, closeModal } = useModalWindow();

const openTeamSelection = (side) => {
    if (props.isTimerRunning) return;
    currentTeamSide.value = side;
    openModal();
};

const selectTeam = (team) => {
    if (currentTeamSide.value === 'left') {
        leftTeam.value = team;
        sessionStorage.setItem('leftTeam', JSON.stringify(team));
        emit('team-selected', team, 'left');
    } else if (currentTeamSide.value === 'right') {
        rightTeam.value = team;
        sessionStorage.setItem('rightTeam', JSON.stringify(team));
        emit('team-selected', team, 'right');
    }
    closeModal();
};

onMounted(() => {
    const storedLeftTeam = JSON.parse(sessionStorage.getItem('leftTeam'));
    const storedRightTeam = JSON.parse(sessionStorage.getItem('rightTeam'));
    leftTeam.value = storedLeftTeam || {};
    rightTeam.value = storedRightTeam || {};
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');

.event__section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}

.left__teamSection {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    font-size: clamp(20px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 105px;
    height: 161px;
    -webkit-line-clamp: 1;
    gap: 10px;
    font-family: "Protest Strike", sans-serif;
    text-transform: capitalize;
    font-weight: 400;
    font-style: normal;
}

.middle__scoreSection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-size: 80px;
    font-weight: 800;
    gap: 10px;
}

.right__teamSection {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    font-size: clamp(20px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 105px;
    height: 161px;
    -webkit-line-clamp: 1;
    gap: 10px;
    font-family: "Protest Strike", sans-serif;
    text-transform: capitalize;
    font-weight: 400;
    font-style: normal;
}

.teamSelectModalWindow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
}

.selectTeamSection {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.event__section img {
    height: 105px;
    width: 105px;
}
</style>
