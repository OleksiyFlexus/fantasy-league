<template>
    <div class="matchTimer" @click="enableEdit">
        <span>{{ formattedTime }}</span>
    </div>
    <div v-if="isEditing" class="timeInputSection">
        <input type="number" v-model="inputMinutes" @keydown.enter="setTimer" placeholder="Минуты" min="0" />
        <span>:</span>
        <input type="number" v-model="inputSeconds" @keydown.enter="setTimer" placeholder="Секунды" min="0" />
        <button @click="setTimer">Установить</button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const isRunning = ref(false);
const timeInSeconds = ref(420); // 7 минут (420 секунд)
let timerInterval;
const isEditing = ref(false);
const inputMinutes = ref(7);
const inputSeconds = ref(0);

const formattedTime = computed(() => {
    const minutes = String(Math.floor(timeInSeconds.value / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds.value % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
});

const enableEdit = () => {
    if (!isRunning.value) {
        inputMinutes.value = Math.floor(timeInSeconds.value / 60);
        inputSeconds.value = timeInSeconds.value % 60;
        isEditing.value = true;
    }
};

const setTimer = () => {
    const totalSeconds = parseInt(inputMinutes.value) * 60 + parseInt(inputSeconds.value);
    timeInSeconds.value = Math.max(totalSeconds, 0);
    isEditing.value = false;
};
</script>

<style scoped>
.matchTimer {
    display: flex;
    justify-content: center;
    font-size: 46px;
    font-weight: 800;
    text-transform: uppercase;
    gap: 15px;
}
</style>