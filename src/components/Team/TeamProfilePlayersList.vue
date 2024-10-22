<template>
    <div v-if="players.length" class="teamProfile">
        <div v-for="player in players" :key="player.id" class="playerItem">
            <div class="playerPhoto">
                <img v-if="player.photo" :src="player.photo" alt="player photo">
                <img v-else src="@/assets/images/UndefinePhoto.png" alt="default player photo">
            </div>
            <div class="playerName">
                <p>{{ player.name }}</p>
                <p>{{ player.surname }}</p>
            </div>
        </div>
    </div>
    <div class="playersNotFind" v-else>
        <span>В команді немає жодного гравця</span>
    </div>
</template>

<script setup>
const props = defineProps({ players: Array });

</script>

<style scoped>
.teamProfile {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    gap: 25px;
    font-size: 20px;
    font-weight: 700;
    width: auto;
}

.playerItem {
    display: flex;
    align-items: center;
    background-color: #cecece;
    gap: 20px;
}


.playerPhoto {
    max-height: 100px;
    max-width: 100px;
    background-color: #666;
}

.playerName {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
    height: 100px;
    font-size: 24px;
}

.playersNotFind span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    height: 50px;
    background-color: #cecece;
}

</style>