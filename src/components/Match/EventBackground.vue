<template>
<div class="eventBackground">
            <img src="@/assets/images/MatchEventBackground.jpg" alt="background event">
        </div>
</template>

<script setup>


</script>

<style scoped>
.eventBackground img {
    position: absolute;
    left: 5px;
    display: flex;
    height: 200px;
    width: 365px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(3px);
    z-index: -1;
}
</style>