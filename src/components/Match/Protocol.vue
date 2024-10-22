<template>
    <div class="protocolHeader">
        <h1>протокол</h1>
    </div>
    <div class="protocolSection">
        <div class="leftProtocolSection">
            <div class="leftTeamLogo">
                <img :src="leftTeam.logo || defaultLogo" alt="default logo">
            </div>
            <div class="leftTeamName">
                <p>{{ leftTeam.teamName || 'Левая команда' }}</p>
            </div>
        </div>
        <div class="rightProtocolSection">
            <div class="rightTeamName">
                <p>{{ rightTeam.teamName || 'Правая команда' }}</p>
            </div>
            <div class="rightTeamLogo">
                <img :src="rightTeam.logo || defaultLogo" alt="default logo">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';
import defaultLogo from '@/assets/images/DefaultTeamLogo.png';

const props = defineProps({
    leftTeam: Object,
    rightTeam: Object,
});

const leftTeam = ref({});
const rightTeam = ref({});

watch(() => props.leftTeam, (newValue) => {
    leftTeam.value = newValue || {};
});

watch(() => props.rightTeam, (newValue) => {
    rightTeam.value = newValue || {};
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');

.protocolSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    background-color: #cecece;
    border-radius: 4px;
    padding: 5px;
}

.protocolSection::before {
    content: '';
    position: absolute;
    bottom: 56px;
    height: 300px;
    width: 2px;
    background: #4d4949;
    right: 186px;
    transform: translateX(-50%);
}

.protocolHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
}

.leftProtocolSection {
    display: flex;
    justify-content: flex-start;
    width: 158px;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.protocolSection img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    object-position: top;

}

.leftTeamName {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(18px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    -webkit-line-clamp: 2;
    font-family: "Protest Strike", sans-serif;
    text-transform: capitalize;
    font-weight: 400;
    font-style: normal;
}

.rightProtocolSection {
    display: flex;
    justify-content: flex-end;
    width: 158px;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.rightTeamName {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(18px, 2vw, 12px);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    -webkit-line-clamp: 2;
    font-family: "Protest Strike", sans-serif;
    text-transform: capitalize;
    font-weight: 400;
    font-style: normal;
}
</style>