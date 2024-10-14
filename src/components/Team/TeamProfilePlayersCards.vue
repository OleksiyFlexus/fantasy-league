<template>
        <div class="teamProfileBackground">
            <BackgroundTeamField />
        </div>
        <div class="player1CardTeamProfilePage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player2CardTeamProfilePage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player3CardTeamProfilePage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player4CardTeamProfilePage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player5CardTeamProfilePage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
</template>

<script setup>
import { BackgroundTeamField } from '@/constants/importIcons';

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');

.teamProfileBackground svg {
    position: relative;
    height: 355px;
    z-index: -9999;
}

.player1CardTeamProfilePage {
    display: flex;
    position: absolute;
    top: 520px;
    left: 68px;
    max-width: 80px;
}

.player2CardTeamProfilePage {
    display: flex;
    position: absolute;
    top: 520px;
    left: 225px;
    max-width: 80px;
}

.player3CardTeamProfilePage {
    display: flex;
    position: absolute;
    max-width: 80px;
    left: 146px;
    top: 580px;
}

.player4CardTeamProfilePage {
    display: flex;
    position: absolute;
    max-width: 80px;
    left: 205px;
    top: 380px;
}

.player5CardTeamProfilePage {
    display: flex;
    position: absolute;
    max-width: 80px;
    left: 85px;
    top: 380px;
}
</style>