<template>
    <div class="teamCardSection">
        <div class="teamLogoSection">
            <img v-if="team.logo" :src="team.logo" alt="team logo">
            <img v-else src="@/assets/images/DefaultTeamLogo.png" alt="default team logo">
        </div>
        <div class="teamNameSection">
            <span>{{ team.teamName }}</span>
        </div>
    </div>

</template>

<script setup>

const props = defineProps({ team: Object });

</script>

<style scoped>
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
    font-size: 26px;
    text-transform: capitalize;
}
</style>