<template>
    <div class="player__items">
        <div class="player__cardSection">
            <img class="card__img" src="@/assets/images/PlayerCard.png" alt="player card">
            <p class="player__cardName">{{ player.surname }}</p>
            <p class="player__Number">{{ player.number }}</p>
            <img v-if="teamLogo" :src="teamLogo" class="playerTeamLogo" alt="team logo" />
            <img v-else-if="player.teamId" :src="defaultTeamLogo" class="playerTeamLogo" alt="Default team logo" />
            <img v-if="player.photo" class="player__photo" :src="player.photo" alt="player photo">
            <img v-else class="player__photo" src="@/assets/images/UndefinePhoto.png" alt="player photo">
        </div>
        <div class="player__nameSection">
            <p class="playerName">{{ player.name }}</p>
            <p class="playerSurname">{{ player.surname }}</p>
            <AddButtonToSquad @team-selected="handleTeamSelected" :player="player" />
        </div>
        <div class="player__statSection">
            <div class="player__statItem">
                <Games />
                <span>Матчі</span>
            </div>
            <div class="player__statItem">
                <Goals />
                <span>Голи</span>
            </div>
            <div class="player__statItem">
                <Assist />
                <span>Ассисти</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Games, Goals, Assist } from '@/constants/importIcons';
import AddButtonToSquad from '@/components/Player/AddButtonToSquad.vue';
import defaultTeamLogo from '@/assets/images/DefaultTeamLogo.png';

const props = defineProps({
    player: {
        type: Object,
        required: true
    }
});

const teamLogo = ref(props.player.teamLogo || '');

const handleTeamSelected = (teamData) => {
    props.player.teamLogo = teamData.team.teamLogo || defaultTeamLogo;
    teamLogo.value = props.player.teamLogo;
};

watch(() => props.player.teamLogo, (newLogo) => {
    teamLogo.value = newLogo;
});
</script>

<style scoped>
.player__items {
    display: flex;
    justify-content: space-between;
    background-color: #cecece31;
    border-radius: 12px;
}

.player__cardSection {
    display: flex;
    position: relative;
    justify-content: center;
}

.card__img {
    height: 105px;
    width: 85px;
}

.playerTeamLogo {
    position: absolute;
    height: 25px;
    top: 70px;
}

.player__nameSection {
    display: block;
    width: 113px;
    max-width: 113px;
    padding-top: 15px;
    padding-left: 5px;

}

.playerName {
    text-transform: capitalize;
    font-size: clamp(14px, 2vw, 8px);
    font-weight: bold;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    height: 19px;
}

.playerSurname {
    text-transform: capitalize;
    font-size: clamp(17px, 2vw, 8px);
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    font-weight: 700;
    height: 24px;
}

.player__cardName {
    position: absolute;
    font-size: clamp(10px, 2vw, 9px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    display: block;
    text-align: center;
    text-transform: uppercase;
    -webkit-line-clamp: 1;
    width: 100px;
    max-height: 30px;
    max-width: 70px;
    bottom: 38px;
    left: 8px;
}

.player__Number {
    position: absolute;
    font-size: clamp(17px, 2vw, 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    display: block;
    text-align: center;
    text-transform: uppercase;
    -webkit-line-clamp: 1;
    max-width: 50px;
    min-width: 45px;
    top: 17px;
    left: 0px;
    padding: 0 6px;
}

.player__photo {
    position: absolute;
    top: 5px;
    left: 33px;
    width: 40px;
    height: 50px;
    border-radius: 4px;
    object-fit: cover;
    object-position: top;
}

.player__statSection {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 4px 4px;
}

.player__statItem {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 50px;
    width: 40px;
    gap: 5px;
}

.player__statItem svg {
    height: 25px;
    width: auto;
}

.player__statItem span {
    font-size: 12px;
}
</style>