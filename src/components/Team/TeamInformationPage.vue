<template>
    <div class="teamInfo">
        <div class="teamInfoHeader">
            <div class="teamItemPageLogo">
                <img src="@/assets/images/DefaultTeamLogo.png" alt="default team logo">
            </div>
            <div class="teamItemPageTeamName">
                <h1>Abrikos</h1>
            </div>
        </div>
        <div class="teamItemPageStatTable">
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
        <div class="fieldBackground">
            <BackgroundTeamInfo />
        </div>
        <div class="player1CardTeamInfoPage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player2CardTeamInfoPage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player3CardTeamInfoPage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player4CardTeamInfoPage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
        <div class="player5CardTeamInfoPage">
            <img src="@/assets/images/PlayerCard.png" alt="player card">
        </div>
    </div>
</template>

<script setup>
import { MatchFieldIcon, Goals, WinsIcon, LoseIcon, BackgroundTeamInfo } from '@/constants/importIcons';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');

.teamInfo {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.teamInfoHeader {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 115px;
    gap: 40px;
    width: auto;
    background-color: #cecece;
}

.teamItemPageLogo img {
    max-height: 115px;
    max-width: 115px;

}

.teamItemPageTeamName {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Protest Strike", sans-serif;
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
}

.teamItemPageStatTable {
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

.fieldBackground svg {
    position: absolute;
    height: 400px;
    max-width: 355px;
    z-index: -9999;
}

.player1CardTeamInfoPage {
    display: flex;
    position: absolute;
    top: 550px;
    left: 68px;
    max-width: 80px;
}

.player2CardTeamInfoPage {
    display: flex;
    position: absolute;
    top: 550px;
    left: 225px;
    max-width: 80px;
}

.player3CardTeamInfoPage {
    display: flex;
    position: absolute;
    max-width: 80px;
    left: 146px;
    top: 610px;
}

.player4CardTeamInfoPage {
    display: flex;
    position: absolute;
    max-width: 80px;
    left: 205px;
    top: 400px;
}

.player5CardTeamInfoPage {
    display: flex;
    position: absolute;
    max-width: 80px;
    left: 85px;
    top: 400px;
}
</style>