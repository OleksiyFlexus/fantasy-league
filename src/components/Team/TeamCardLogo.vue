<template>
    <div class="teamCardSection">
        <div class="teamLogoSection">
            <img src="@/assets/images/DefaultTeamLogo.png" alt="team logo">
        </div>
        <div class="teamNameSection">
            <span>Abrikos olegovich</span>
        </div>
    </div>

</template>

<script setup>

</script>

<style scoped>
.teamCardSection {
    display: flex;
    align-items: center;
    padding: 5px;
    background-color: #cecece31;
    border-radius: 20px;
    gap: 25px;
}

.teamLogoSection {
    display: flex;
    max-width: 75px;
    height: auto;
}

.teamNameSection {
    display: flex;
    text-align: center;
    font-size: 26px;
    text-transform: capitalize;
}
</style>