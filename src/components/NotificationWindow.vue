<template>
    <div v-if="visible" class="notification">
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    visible: {
        type: Boolean,
        default: false,
    },
});

const internalVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
    internalVisible.value = newVal;
    if (newVal) {
        setTimeout(() => {
            internalVisible.value = false;
        }, 3000);
    }
});
</script>

<style scoped>
.notification {
    position: fixed;
    display: flex;
    align-items: center;
    text-align: center;
    width: 300px;
    height: 100px;
    font-size: 14px;
    text-transform: uppercase;
    top: 50%;
    right: 35px;
    background-color: #38a03c;
    color: #ffff;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
</style>
