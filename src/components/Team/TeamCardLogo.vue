<template>
    <div class="image__section">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    imageUrl: String
});

</script>

<style scoped>
.image__section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image__section img {
    height: 180px;
    width: auto;
}
</style>