<template>
    <div v-if="team" class="teamInfoHeader">
        <div class="teamItemPageLogo">
            <img v-if="team.logo" :src="team.logo" alt="team logo">
            <img v-else src="@/assets/images/DefaultTeamLogo.png" alt="default team logo">
        </div>
        <div class="teamItemPageTeamName">
            <h1>{{ team.teamName }}</h1>
        </div>
    </div>
    <div v-else>
        <p>Дані про команду не знайдено</p>
    </div>
</template>

<script setup>

const props = defineProps({ team: Object });
</script>

<style scoped>

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
</style>