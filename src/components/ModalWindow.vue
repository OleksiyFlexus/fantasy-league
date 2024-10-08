<template>
    <div v-if="isActive" class="modal_overlay">
        <div class="modal_container" :class="{ 'fade_in': isActive, 'fade_out': !isActive }" @click.stop>
            <div class="modal_header">
                <slot name="header">
                    <button @click="closeModal" class="close_modal_button">&times;</button>
                </slot>
            </div>
            <div class="modal_body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    isActive: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>

<style scoped>

.modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 99999;
}

.modal_container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade_in {
    opacity: 1;
    transform: scale(1);
}

.fade_out {
    opacity: 0;
    transform: scale(0.8);
}

.modal_header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.close_modal_button {
    background-color: #f37676;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    font-size: 24px;
    cursor: pointer;
}

.modal_body {
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

</style>