<template>
  <div class="itemListSection">
    <div v-if="items.length">
      <div class="itemList">
        <div v-for="item in items" :key="item.id">
          <PlayerListItem v-if="itemType === 'player'" :player="item" />
          <TeamListItem v-else-if="itemType === 'team'" :team="item" />
        </div>
      </div>
    </div>
    <div v-else>
      <h1 v-if="itemType === 'team'">Жодної команди не знайдено</h1>
      <h1 v-else>Жодного гравця не знайдено</h1>
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
.itemListSection {
  display: flex;
  flex-direction: column;
}

.itemList {
  display: flex;
  flex-direction: column;
  gap: 10px;

}

.itemList h1 {
  margin: 10px;
  font-size: 18px;
  font-weight: 700;
}
</style>