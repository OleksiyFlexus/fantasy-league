<template>
  <router-view></router-view>
  <div class="common_container">
    <PlayersMainContent />
    <SearchBar @update:search="handleSearch" />
    <CreatePlayersSection :search-query="searchQuery" @player-created="addPlayerToList" />
    <PlayersHeader />
    <DataBaseItemsList :items="filteredPlayers" itemType="player" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { findAllPlayerInDb } from '@/api/player';
import PlayersMainContent from '@/components/player/PlayersMainContent.vue';
import PlayersHeader from '@/components/TableHeader.vue';
import CreatePlayersSection from '@/components/player/CreatePlayersSection.vue';
import DataBaseItemsList from '@/components/DataBaseItemsList.vue';
import SearchBar from '@/components/SearchBar.vue';

const players = ref([]);
const searchQuery = ref('');

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

const filteredPlayers = computed(() => {
  return players.value.filter(player =>
    (player.name && player.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    (player.surname && player.surname.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

onMounted(async () => {
  await findAllPlayers();
});
</script>