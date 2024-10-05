<template>
    <router-view></router-view>
    <div class="common_container">
        <PlayersMainContent />
        <SearchBar />
        <CreatePlayersSection :players="players" />
        <TableHeader />
        <DataBaseItemsList :players="players" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { findAllPlayerInDb } from '@/api/player';
import PlayersMainContent from '@/components/Player/PlayersMainContent.vue';
import TableHeader from '@/components/TableHeader.vue';
import CreatePlayersSection from '@/components/Player/CreatePlayersSection.vue';
import DataBaseItemsList from '@/components/DataBaseItemsList.vue';
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