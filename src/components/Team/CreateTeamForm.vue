<template>
    <div class="form__section">
        <h2>Заповніть поля</h2>
        <form @submit.prevent="createTeam">
            <div class="form__inputSection">
                <input type="text" placeholder="введіть назву команди" required>
                <div class="buttonSection">
                    <input type="file" id="fileUpload" @change="handleLogoUpload" />
                    <label for="fileUpload">Завантажити логотип</label>
                    <span>
                        <UploadIcon />
                    </span>
                </div>
            </div>
        </form>
        <div class="team__prewievLogo">
            <img v-if="imageUrl" :src="imageUrl" alt="team logo">
            <img v-else src="@/assets/images/DefaultTeamLogo.png" alt="default team logo">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploadIcon } from '@/constants/importIcons';

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
    gap: 5px;
}

.form__inputSection input[type="file"] {
    display: none;
}

.form__inputSection svg {
    height: 30px;
    width: 30px;
    border-radius: 5px;
}

.form__inputSection label {
    display: inline-block;
    text-align: center;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #1bbc9b;
    color: #000;
    font-weight: 700;
    border: none;
    border-radius: 5px;
}

.form__inputSection label:hover {
    background-color: #13a084;
    /* Цвет фона при наведении */
}

.form__section img {
    height: auto;
    width: 250px;
    object-fit: cover;
}

.buttonSection {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
}
.buttonSection span {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1bbc9b;
    width: 38px;
    height: 38px;
    border-radius: 5px;
}

.team__prewievLogo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
</style>
