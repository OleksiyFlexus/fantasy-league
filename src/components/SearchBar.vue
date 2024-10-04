<template>
    <div class="search__bar">
        <input type="text" v-model="searchQuery" :placeholder="placeholderText" class="search__input" />
    </div>
    <div class="searchBar__button">
        <SearchIcon />
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { SearchIcon } from '@/constants/importIcons.js';

const searchQuery = ref('');

const props = defineProps({
    placeholderText: {
        type: String,
        default: 'Пошук гравців'
    }
});

</script>

<style scoped>
.search__bar {
    border: 2px solid #666;
    border-radius: 25px;
    padding: 5px;
    margin: auto 0;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    background-color: #1a1919f6;
}

.search__input {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    color: #fff;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem;
}

.search__input::placeholder {
    color: #aaa;
}

.search__input::first-letter {
    text-transform: uppercase;
}

.searchBar__button {
    height: 45px;
    width: 45px;
    background-color: #646464;
    border: none;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.searchBar__button svg {
    height: auto;
    width: 25px;
}

</style>