<template>
    <div class="image__section">
        <img src="@/assets/images/PlayerCard.png" alt="player card">
        <p class="card__PlayerSurname">{{ props.initialFormValues.surname }}</p>
        <p class="card__PlayerNumber"> {{ props.initialFormValues.number }}</p>
    </div>
</template>

<script setup>
const props = defineProps({ initialFormValues: Object });
</script>

<style scoped>
.image__section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image__section img {
    height: 180px;
    width: auto;
}

.card__PlayerSurname {
    position: absolute;
    bottom: 65px;
    font-size: clamp(12px, 2vw, 12px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    display: block;
    text-align: center;
    text-transform: uppercase;
    -webkit-line-clamp: 1;
    max-width: 100px;

}

.card__PlayerNumber {
    position: absolute;
    top: 30px;
    left: 107px;
    font-size: 25px;
    font-weight: 700;
    width: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>