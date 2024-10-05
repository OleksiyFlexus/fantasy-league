<template>
    <button class="add_playerToSquad" type="submit">Додати гравця до команди
        <AddToTeamIcon />
    </button>
</template>

<script setup>
import { AddToTeamIcon } from '@/constants/importIcons';
</script>

<style scoped>
.add_playerToSquad {
    display: flex;
    align-items: center;
    background-color: #1bbc9b;
    border: none;
    color: white;
    padding: 10px 10px;
    text-align: center;
    font-size: 10px;
    margin: 4px 2px;
    opacity: 1;
    transition: 0.3s;
    border-radius: 10px;
    height: 25px;
}

.add_playerToSquad svg {
    height: 30px;
    width: 30px;
}

.add_playerToSquad:hover {
    opacity: 0.6;
}
</style>