<template>
    <div class="playerList__container">
      <div v-if="!!players.length" v-for="player in players" :key="player.id" class="table__items">
        <PlayerListItem :player="player"/>
      </div>
      <div v-else class="table__items">
        <h1>Жодного гравця не знайдено</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import PlayerListItem from './Player/PlayerListItem.vue';
  const props = defineProps({ players: Array });
  </script>
  
  <style scoped>
  .playerList__container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .table__items h1 {
    margin: 10px;
    font-size: 18px;
    font-weight: 700;
  }
  </style>