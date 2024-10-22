<template>
  <div v-if="!isPlayerInTeam">
    <button class="add_playerToSquad" type="button" @click="openModal">
      Додати гравця до команди
      <AddToTeamIcon />
    </button>
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
import { findAllTeamInDb } from '@/api/team';
import { updatePlayerTeamInDb } from '@/api/player'; // Обновляем функцию
import { AddToTeamIcon } from '@/constants/importIcons';
import { useModalWindow } from '@/helpers/useModalWindow';
import ModalWindow from '../ModalWindow.vue';
import TeamListItem from '../Team/TeamListItem.vue';

const { isModalActive, openModal, closeModal } = useModalWindow();

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
});

const teams = ref([]);

const isPlayerInTeam = computed(() => {
  return props.player.teamLogo && props.player.teamLogo.length > 0;
});

const emit = defineEmits(['team-selected']);

const selectTeam = async (team) => {
  try {
    await updatePlayerTeamInDb(props.player.id, team);
    props.player.teamLogo = team.teamLogo;

    emit('team-selected', { team, player: props.player });
    closeModal();
  } catch (error) {
    console.error("Ошибка при добавлении игрока в команду:", error);
  }
};

onMounted(async () => {
  try {
    teams.value = await findAllTeamInDb();
  } catch (error) {
    console.error('Ошибка при загрузке команд:', error);
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
</style>
