<template>
    <router-view></router-view>
    <div>
        <PlayersMainContent />
        <DataSection :players="players" />
        <PlayerTable />
        <PlayersList :players="players" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataSection from '@/components/DataSection.vue';
import PlayersList from '@/components/Player/PlayersList.vue';
import PlayersMainContent from '@/components/Player/PlayersMainContent.vue';
import PlayerTable from '@/components/Player/PlayersTable.vue';
import { findAllPlayerInDb } from '@/api/player';

const players = ref([]);

const fetchPlayers = async () => {
  try {
    const playerDocs = await findAllPlayerInDb();
    players.value = playerDocs.map(doc => doc);
  } catch (error) {
    console.error('Ошибка при загрузке игроков:', error);
  }
};

onMounted(fetchPlayers);
</script>