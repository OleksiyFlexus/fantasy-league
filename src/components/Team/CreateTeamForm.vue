<template>
    <div class="form__section">
        <h2>Заповніть поля</h2>
        <form @submit.prevent="createTeam">
            <div class="form__inputSection">
                <input type="text" placeholder="Введіть назву команди" required>
                <label> Завантажте логотип команди
                    <span class="tip__icon">
                        <TipIcon />
                        <span class="tip__helpText">Зайвий фон з лого буде прибрано.
                        </span>
                    </span>
                </label>
                <div class="team__prewievLogo">
                    <input type="file" @change="handleLogoUpload" />
                    <img v-if="imageUrl" :src="imageUrl" alt="team logo">
                    <img v-else src="../../assets/images/DefaultTeamLogo.png" alt="default team logo">
                </div>
            </div>
            
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { TipIcon } from '@/constants/importIcons';

const imageUrl = ref(null);
const initialFormValues = ref({
    file: null,
    fileName: ''
});

const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    initialFormValues.value.file = file;
    initialFormValues.value.fileName = file.name;

    imageUrl.value = URL.createObjectURL(file);
};
</script>

<style scoped>
.form__inputSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form__section input:nth-child(3) {
    border: none;
    outline: none;
    text-transform: none;
}

.form__section img {
    height: auto;
    width: 250px;
    object-fit: cover;
}
.team__prewievLogo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>
