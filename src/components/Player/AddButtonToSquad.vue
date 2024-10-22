<template>
  <div v-if="!isPlayerInTeam">
    <button class="add_playerToSquad" type="button" @click="openModal">
      Додати гравця до команди
      <AddToTeamIcon />
    </button>
  </div>
  <div class="playerInTeamName" v-else>
    <span>{{ teamName }}</span>
  </div>
  <ModalWindow :isActive="isModalActive" @close="closeModal">
    <div class="teamSelectModalWindow">
      <h1>Оберіть команду</h1>
      <div class="selectTeamSection">
        <div v-if="!teams || teams.length === 0">Немає доступних команд</div>
        <div v-for="team in teams" :key="team.id" @click="selectTeam(team)">
          <TeamListItem :team="team" />
        </div>
      </div>
    </div>
  </ModalWindow>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { findAllTeamInDb, findTeamById } from '@/api/team';
import { updatePlayerTeamInDb } from '@/api/player';
import { AddToTeamIcon } from '@/constants/importIcons';
import { useModalWindow } from '@/helpers/useModalWindow';
import ModalWindow from '../ModalWindow.vue';
import TeamListItem from '../Team/TeamListItem.vue';
import defaultTeamLogo from '@/assets/images/DefaultTeamLogo.png';

const { isModalActive, openModal, closeModal } = useModalWindow();

const props = defineProps({
  player: {
    type: Object,
    required: true
  },
  team: {
    type: Object,
    required: false,
  },
});

const teams = ref([]);
const playerTeam = ref(props.team || null);
const isPlayerInTeam = computed(() => playerTeam.value !== null);
const teamName = computed(() => playerTeam.value ? playerTeam.value.teamName : 'Без команди');

const emit = defineEmits(['team-selected']);

const selectTeam = async (team) => {
  if (!team.id) {
    console.error("Ошибка: Объект команды не содержит необходимые поля.", team);
    return;
  }

  const teamLogo = team.logo || defaultTeamLogo;

  try {
    playerTeam.value = { ...team, teamLogo: teamLogo };
    await updatePlayerTeamInDb(props.player.id, {
      id: team.id,
      teamLogo: teamLogo,
      name: team.teamName,
    }, props.player);

    emit('team-selected', { team: playerTeam.value, player: props.player });
    closeModal();
  } catch (error) {
    console.error("Ошибка при добавлении игрока в команду:", error);
  }
};

onMounted(async () => {
  try {
    teams.value = await findAllTeamInDb();
    if (!playerTeam.value && props.player.teamId) {
      const playerTeamData = await findTeamById(props.player.teamId);
      playerTeam.value = playerTeamData;
    }
  } catch (error) {
    console.error('Ошибка при загрузке команд или команды игрока:', error);
  }
});
</script>

<style scoped>
.teamSelectModalWindow {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.teamSelectModalWindow h1 {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.selectTeamSection {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.add_playerToSquad {
  display: flex;
  align-items: center;
  background-color: #1bbc9b;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  font-size: 10px;
  margin: 4px 2px;
  opacity: 1;
  transition: 0.3s;
  border-radius: 10px;
  height: 25px;
}

.add_playerToSquad svg {
  height: 30px;
  width: 30px;
}

.add_playerToSquad:hover {
  opacity: 0.6;
}

.playerInTeamName {
  display: flex;
  font-family: "Protest Strike", sans-serif;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 600;
}
</style>
