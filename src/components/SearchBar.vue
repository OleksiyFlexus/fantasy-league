<template>
    <div class="search__barSection">
        <div class="search__bar">
            <input type="text" v-model="input" @input="onInput" :placeholder="placeholderText" class="search__input" />
        </div>
        <div class="searchBar__button">
            <SearchIcon />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SearchIcon } from '@/constants/importIcons.js';

const props = defineProps({
    placeholderText: {
        type: String,
        default: 'Пошук гравців',
    },
});

const input = ref('');

const emit = defineEmits(['update:search']);
const onInput = () => {
    emit('update:search', input.value.trim() || ''); 
};
</script>

<style scoped>
.search__barSection {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
}

.search__bar {
    border-radius: 25px;
    padding: 5px;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
    height: 40px;
    max-width: 600px;
    background-color: #1a1919e7;
}

.search__input {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    color: #fff;
    outline: none;
    font-size: 18px;
    font-weight: 500;
    text-transform: capitalize;
    padding: 0.5rem;
}

.search__input::placeholder {
    color: #aaa;
}

.search__input::first-letter {
    text-transform: uppercase;
}

.searchBar__button {
    height: 40px;
    width: 50px;
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