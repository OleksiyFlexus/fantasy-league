<template>
  <router-view></router-view>
  <div class="common_container">
    <PlayersMainContent />
    <SearchBar @update:search="handleSearch" />
    <div v-if="error" class="error_message">
      {{ error }}
    </div>
    <div class="createItemSection">
      <CreatePlayersSection :search-query="searchQuery" />
      <p>Показано результатів: {{ filteredPlayers.length }}</p>
    </div>
    <PlayersHeader />
    <DataBaseItemsList :items="filteredPlayers" itemType="player" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import PlayersMainContent from "@/components/Player/PlayersMainContent.vue";
import PlayersHeader from "@/components/TableHeader.vue";
import CreatePlayersSection from "@/components/Player/CreatePlayers.vue";
import DataBaseItemsList from "@/components/DataBaseItemsList.vue";
import SearchBar from "@/components/SearchBar.vue";

const players = ref([]);
const searchQuery = ref("");
const error = ref(null);

const findAllPlayers = () => {
  try {
    const db = getDatabase();
    const playersRef = dbRef(db, "players");

    onValue(playersRef, (snapshot) => {
      const playersData = snapshot.val();
      if (playersData) {
        players.value = Object.keys(playersData).map((key) => ({
          id: key,
          ...playersData[key],
        }));
      } else {
        error.value = "Гравців не знайдено в БД";
      }
    });
  } catch (err) {
    error.value = "Помилка при завантаженні данних гравців:";
  }
};

const filteredPlayers = computed(() => {
  return players.value.filter(
    (player) =>
      (player.name &&
        player.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (player.surname &&
        player.surname.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

onMounted(() => {
  findAllPlayers();
});
</script>
