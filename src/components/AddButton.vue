<template>
    <button class="addBtn">
        <span>{{ buttonText }}</span>
    </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    buttonText: {
        type: String,
        default: 'Створити гравця'
    }
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');

.addBtn {
    display: inline-block;
    border-radius: 4px;
    background-color: #1bbc9b;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 14px;
    padding: 10px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 700;
    font-style: normal;
}

.addBtn span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}

.addBtn span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

.addBtn:hover span {
    padding-right: 25px;
}

.addBtn:hover span:after {
    opacity: 1;
    right: 0;
}
</style>