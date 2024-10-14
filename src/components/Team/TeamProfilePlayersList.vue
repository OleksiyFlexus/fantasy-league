<template>
    <div class="teamProfile">
        <div class="teamProfilePlayersList">
            <div v-if="players.length">
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
            <div v-else>
                <span>В команді немає жодного гравця</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ players: Array });

</script>

<style scoped>
.teamProfile {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #e75757;
    height: 100px;
    width:auto;
    background-color: #cecece;
}

.teamProfilePlayersList {
    display: flex;
    align-items: center;
    gap: 20px;
}


.playerPhoto {
    max-height: 100px;
    max-width: 100px;
    background-color: #666;
}

.playerName {
    display: flex;
    text-align: center;
    justify-content: flex-start;
    padding-top: 20px;
    height: 100px;
    font-size: 20px;


}
</style>