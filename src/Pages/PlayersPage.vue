<template>
  <router-view></router-view>
  <div class="common_container">
    <PlayersMainContent />
    <SearchBar />
    <CreatePlayersSection :players="players" @player-created="addPlayerToList" />
    <PlayersHeader />
    <DataBaseItemsList :players="players" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { findAllPlayerInDb } from '@/api/player';
import PlayersMainContent from '@/components/player/PlayersMainContent.vue';
import PlayersHeader from '@/components/TableHeader.vue';
import CreatePlayersSection from '@/components/player/CreatePlayersSection.vue';
import DataBaseItemsList from '@/components/DataBaseItemsList.vue';
import SearchBar from '@/components/SearchBar.vue';

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

const addPlayerToList = (newPlayer) => {
  players.value.push(newPlayer);
};

onMounted(async () => {
  await findAllPlayers();
});
</script>