<template>
    <div class="form__section">
        <h2>Заповніть поля</h2>
        <form @submit.prevent="createPlayer">
            <div class="form__inputSection">
                <input @input="props.changeFormValue('name', $event.target.value)"
                    v-model="props.initialFormValues.name" type="text" placeholder="І'мя" required>
                <input @input="props.changeFormValue('surname', $event.target.value)"
                    v-model="props.initialFormValues.surname" type="text" placeholder="Прізвище" required>
                <input @input="props.changeFormValue('number', $event.target.value)"
                    v-model="props.initialFormValues.number" type="number" min="1" max="99" placeholder="Номер"
                    required>
                <div class="buttonSection">
                    <input type="file" id="fileUpload" @change="handlePhotoUpload">
                    <label for="fileUpload"> Завантажте фото для картки</label>
                    <span>
                        <UploadIcon />
                    </span>
                    <div class="form__previewImage">
                        <img v-if="imageUrl" :src="imageUrl" alt="Предварительный просмотр" />
                        <img v-else src="@/assets/images/UndefinePhoto.png" alt="default player photo">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploadIcon } from '@/constants/importIcons';

const props = defineProps({
    initialFormValues: {
        type: Object,
        required: true
    },
    changeFormValue: {
        type: Function,
        required: true
    },
    handlePhotoUpload: {
        type: Function,
        required: true
    }
});

const imageUrl = ref(null);

const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    props.initialFormValues.file = file;
    props.initialFormValues.fileName = file.name;

    imageUrl.value = URL.createObjectURL(file);
};

</script>

<style>
.form__section {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    color: #fff;
    font-weight: 700;
    border: none;
    border-radius: 5px;
}

.form__inputSection label:hover {
    background-color: #13a084;
    /* Цвет фона при наведении */
}


.form__section h2 {
    font-weight: 700;
    font-size: 2em;
    text-align: center;
    margin-top: 0px;
}

.form__imageSection {
    display: flex;
    justify-content: center;
    width: auto;
    height: 180px;
}

.form__previewImage {
    display: flex;
    position: absolute;
    left: 155px;
    top: 70px;
}

.form__previewImage img {
    height: 70px;
    width: 60px;
    border-radius: 13px;
    object-fit: cover;
}

.form__inputSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form__section input {
    text-transform: capitalize;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    font-weight: 700;
    font-size: 16px;
}

.form__inputSection input[type="file"] {
    display: none;
}

.form__section select {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
}

.form__section label {
    cursor: default;
}

</style>