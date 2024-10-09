<template>
    <div>
        <div class="matchTimerSection">
            <div class="matchTimer" @click="openModal">
                <span>{{ formattedTime }}</span>
            </div>
            <ModalWindow :isActive="isModalActive" @close="closeModal">
                <div class="timerModalWindowSection">
                    <div class="timerModalWindowHeader">
                        <h3>Установите таймер</h3>
                    </div>
                    <div class="timerInputSection">
                        <input type="number" v-model="inputMinutes" placeholder="Минуты" min="0" />
                        <span>:</span>
                        <input type="number" v-model="inputSeconds" placeholder="Секунды" min="0" />
                    </div>
                    <div class="timerModalWindowButton">
                        <button @click="setTimer">Установить</button>
                    </div>
                </div>
            </ModalWindow>
            <div class="matchButtonSection">
                <button @click="startTimer" :disabled="isRunning">Старт</button>
                <button @click="pauseTimer" :disabled="!isRunning">Пауза</button>
                <button @click="resetTimer">Обнулити</button>
            </div>
            <div v-if="error" class="error_message">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineEmits } from 'vue';
import { useModalWindow } from '@/helpers/useModalWindow';
import ModalWindow from '../ModalWindow.vue';

const emit = defineEmits(['timer-started', 'timer-stopped']);
const { isModalActive, openModal, closeModal } = useModalWindow();

const isRunning = ref(false);
const timerInterval = ref(null);
const timeInSeconds = ref(420);
const inputMinutes = ref(null);
const inputSeconds = ref(null);
const error = ref('');
const loadTimer = () => {
    const savedTimer = parseInt(sessionStorage.getItem('timer'));
    const isTimerRunning = sessionStorage.getItem('isTimerRunning') === 'true';

    if (!isNaN(savedTimer)) {
        timeInSeconds.value = savedTimer;
    }

    if (isTimerRunning) {
        startTimer();
    }
};

const saveTimer = () => {
    sessionStorage.setItem('timer', timeInSeconds.value);
    sessionStorage.setItem('isTimerRunning', isRunning.value);
};

const formattedTime = computed(() => {
    const minutes = String(Math.floor(timeInSeconds.value / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds.value % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
});

const setTimer = () => {
    const totalMinutes = inputMinutes.value !== null ? parseInt(inputMinutes.value) : 0;
    const totalSeconds = inputSeconds.value !== null ? parseInt(inputSeconds.value) : 0;
    const totalTimeInSeconds = (totalMinutes * 60) + totalSeconds;

    timeInSeconds.value = Math.max(totalTimeInSeconds, 0);
    saveTimer();
    closeModal();
};

const checkTeamsSelected = () => {
    const leftTeam = JSON.parse(sessionStorage.getItem('leftTeam'));
    const rightTeam = JSON.parse(sessionStorage.getItem('rightTeam'));

    if (!leftTeam || !leftTeam.teamName || !rightTeam || !rightTeam.teamName) {
        error.value = 'Будь ласка оберіть дві команди щоб розпочати матч.';
        return false;
    }

    error.value = '';
    return true;
};

const startTimer = () => {
    if (isRunning.value) return;

    if (!checkTeamsSelected()) {
        return;
    }

    isRunning.value = true;
    emit('timer-started');

    timerInterval.value = setInterval(() => {
        if (timeInSeconds.value > 0) {
            timeInSeconds.value--;
            saveTimer();
        } else {
            clearInterval(timerInterval.value);
            isRunning.value = false;
            emit('timer-stopped');
        }
    }, 1000);
};

const pauseTimer = () => {
    clearInterval(timerInterval.value);
    isRunning.value = false;
    saveTimer();
};

const resetTimer = () => {
    clearInterval(timerInterval.value);
    isRunning.value = false;
    timeInSeconds.value = 420;
    sessionStorage.removeItem('timer');
    emit('timer-stopped');
    saveTimer();
};

const saveTimerBlocked = () => {
    sessionStorage.setItem('isTimerBlocked', isRunning.value);
};

onMounted(() => {
    loadTimer();
});

onUnmounted(() => {
    clearInterval(timerInterval.value);
});
</script>

<style scoped>
.matchTimerSection {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.matchTimer {
    display: flex;
    justify-content: center;
    font-size: 46px;
    font-weight: 800;
    text-transform: uppercase;
    gap: 15px;
}

.matchButtonSection {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.matchButtonSection button {
    padding: 5px;
    background-color: #1bbc9b;
    font-size: 14px;
    font-weight: 700;
    width: 90px;
    height: 30px;
    border-radius: 8px;
    text-transform: uppercase;
}

.timerModalWindowSection {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

.timerModalWindowHeader {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 24px;
}

.timerModalWindowButton button {
    padding: 5px;
    background-color: #1bbc9b;
    font-size: 12px;
    font-weight: 700;
    width: 120px;
    height: 30px;
    border-radius: 8px;
    text-transform: uppercase;
}

.timerInputSection {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.timerInputSection input {
    width: 120px;
    text-align: center;
    font-size: 24px;
    float: right;
}
</style>