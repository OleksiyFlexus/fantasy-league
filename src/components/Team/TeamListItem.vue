<template>
    <div class="teamCardSection">
        <div class="teamLogoSection">
            <img v-if="team.logo" :src="team.logo" alt="team logo">
            <img v-else src="@/assets/images/DefaultTeamLogo.png" alt="default team logo">
        </div>
        <div class="teamNameSection">
            <h1>{{ team.teamName }}</h1>
        </div>
    </div>

</template>

<script setup>

const props = defineProps({ team: Object });

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');

.teamCardSection {
    display: flex;
    align-items: center;
    max-height: 75px;
    padding: 5px;
    background-color: #cecece31;
    border-radius: 20px;
    gap: 25px;
}

.teamLogoSection {
    display: flex;
    padding: 5px;
    max-height: 75px;
    width: 75px;
}

.teamNameSection {
    display: flex;
    text-align: center;
    font-size: 25px;
    text-transform: capitalize;
    color: #414122;
    font-family: "Protest Strike", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.teamLogoSection img {
    border-radius: 5px;
}
</style>