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
.tableHeader {
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
    gap: 90px;

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