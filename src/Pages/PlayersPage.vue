<template>
    <router-view></router-view>
    <div>
        <PlayersMainContent />
        <DataSection />
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

const findAllPlayers = async () => {
  try {
    const playerDocs = await findAllPlayerInDb();
    if (playerDocs.empty) {
      console.log('Гравців не знайдено в БД');
    } else {
      players.value = playerDocs.map(doc => doc);
    }
  } catch (error) {
    console.error("Помилка при завантаженні данних гравців:", error);
  }
};

onMounted(async () => {
  await findAllPlayers();
});
</script>

<style scoped></style>