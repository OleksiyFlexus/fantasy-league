<template>
    <button class="saveBtn" type="submit" @click="save">
        <span>Зберегти</span>
    </button>
</template>

<script setup>
const emit = defineEmits(['save']);
const save = () => {
    emit('save');
};

</script>

<style scoped>
.saveBtn {
    background-color: #4cc21dd0;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    font-size: 14px;
    margin: 4px 2px;
    opacity: 0.6;
    transition: 0.3s;
    text-decoration: none;
    cursor: pointer;
    border-radius: 8px;
}

.saveBtn:hover {
    opacity: 1;
}
</style>