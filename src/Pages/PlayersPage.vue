<template>
    <router-view></router-view>
    <div class="common_container">
        <PlayersMainContent />
        <SearchBar />
        <PlayersDataSection :players="players" />
        <PlayerTable />
        <DataItemsList :players="players" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlayersDataSection from '@/components/Player/PlayersDataSection.vue';
import DataItemsList from '@/components/DataItemsList.vue';
import PlayersMainContent from '@/components/Player/PlayersMainContent.vue';
import PlayerTable from '@/components/ComonTableHeader.vue';
import { findAllPlayerInDb } from '@/api/player';
import SearchBar from '@/components/SearchBar.vue';

const players = ref([]);

const fetchPlayers = async () => {
  try {
    const playerDocs = await findAllPlayerInDb();
    players.value = playerDocs.map(doc => doc);
  } catch (error) {
    console.error('Помилка при завантаженні гравців:', error);
  }
};

onMounted(fetchPlayers);
</script>