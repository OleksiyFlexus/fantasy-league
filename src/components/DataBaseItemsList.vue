<template>
  <div class="playerList__container">
    <div v-if="items.length" v-for="item in items" :key="item.id" class="table__items">
      <PlayerListItem v-if="itemType === 'player'" :player="item" />
      <TeamListItem v-else-if="itemType === 'team'" :team="item" />
    </div>
    <div v-else class="table__items">
      <h1>Жодного елемента не знайдено</h1>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import PlayerListItem from './player/PlayerListItem.vue';
import TeamListItem from './team/TeamListItem.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
});
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