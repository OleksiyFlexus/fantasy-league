<template>
    <div>
        <div class="teamProfileStatistic">
            <div class="itemStatWrap">
                <MatchFieldIcon />
                <h1>Матчі</h1>
                <p>0</p>
            </div>
            <div class="itemStatWrap">
                <Goals />
                <h1>Голи</h1>
                <p>0</p>
            </div>
            <div class="itemStatWrap">
                <WinsIcon />
                <h1>Перемоги</h1>
                <p>0</p>
            </div>
            <div class="itemStatWrap">
                <LoseIcon />
                <h1>Поразки</h1>
                <p>0</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MatchFieldIcon, Goals, WinsIcon, LoseIcon } from '@/constants/importIcons';
</script>

<style scoped>
.teamProfileStatistic {
    display: flex;
    padding: 5px;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    height: 100px;
    background-color: #cecece31;
}

.itemStatWrap {
    display: flex;
    justify-content: center;
    height: 90px;
    width: auto;
    flex-direction: column;
    gap: 3px;
    align-items: center;
}

.itemStatWrap h1 {
    font-size: 15px;
    font-weight: 700;
}

.itemStatWrap p {
    font-size: 20px;
    font-weight: 700;
}
</style>