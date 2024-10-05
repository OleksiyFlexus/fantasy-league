<template>
    <div class="top__mainSection">
        <div class="logo__section">
            <img class="main__logo" src="@/assets/images/FantasyLogo.png" alt="logo">
        </div>
        <div class="text__section">
            <h1>Список гравців Fantasy League </h1>
        </div>
    </div>
    <div class="search__section">
        <SearchBar />
    </div>


</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';


</script>

<style scoped>
.top__mainSection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;
}

.logo__section {
    display: flex;
    justify-content: center;
}

.text__section {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 38px;
    font-weight: 600;
}

.search__section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-top: 15px;
}

.main__logo {
    width: 165px;
    height: 165px;
}
</style>