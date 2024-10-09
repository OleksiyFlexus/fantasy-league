<template>
    <router-view></router-view>
    <div class="tableHeader">
        <ul class="tableItems">
            <li>Загальна інформація</li>
            <li>Статистика</li>
        </ul>
    </div>


</template>

<script setup>


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&family=Yanone+Kaffeesatz:wght@200..700&display=swap');

.tableHeader {
    display: flex;
    justify-content: space-around;
    background-color: #1a19192d;
    width: 100%;
    height: 60px;
}

.tableItems {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 90px;
    font-family: "Yanone Kaffeesatz", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 19px;
}

.tableItems::before {
    content: '';
    position: absolute;
    height: 60px;
    width: 2px;
    background: #4d4949;
    right: 165px;
    transform: translateX(-50%);
}
</style>