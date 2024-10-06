<template>
    <div class="matchTimerSection">
        <div class="matchTimer">
            <span>07:00</span>
        </div>
        <div class="matchButtonSection">
            <button>Старт</button>
            <button>Пауза</button>
            <button>Обнулити</button>
        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>
.matchTimerSection {
    padding-top: 15px;
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
</style>