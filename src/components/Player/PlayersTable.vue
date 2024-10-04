<template>
    <router-view></router-view>
    <div class="player__tableHeader">
        <ul class="tableItems">
            <li>Загальна інформація</li>
            <li>Статистика</li>
        </ul>
    </div>


</template>

<script setup>


</script>

<style scoped>
.player__tableHeader {
    display: flex;
    justify-content: space-between;
    background-color: #1a19192d;
    width: 100%;
    height: 60px;
    padding: 0 10px;
}

.tableItems {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 70px;

}
</style>