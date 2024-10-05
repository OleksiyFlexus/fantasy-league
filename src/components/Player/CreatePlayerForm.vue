<template>
    <div class="form__section">
        <h2>Заповніть поля</h2>
        <form @submit.prevent="createPlayer">
            <div class="form__inputSection">
                <input @input="props.changeFormValue('name', $event.target.value)" v-model="props.initialFormValues.name" type="text" placeholder="І'мя" required>
                <input @input="props.changeFormValue('surname', $event.target.value)" v-model="props.initialFormValues.surname" type="text" placeholder="Прізвище" required>
                <input @input="props.changeFormValue('number', $event.target.value)" v-model="props.initialFormValues.number" type="number" min="1" max="99" placeholder="Номер" required>
                <label> Завантажте фото для картки
                    <span class="tip__icon">
                        <TipIcon />
                        <span class="tip__helpText">Зайвий фон з фото буде прибрано.</span>
                    </span>
                </label>
                <input type="file" @change="handlePhotoUpload">            
                <div v-if="imageUrl" class="form__previewImage">
                    <img :src="imageUrl" alt="Предварительный просмотр" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { TipIcon } from '@/constants/importIcons';

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
    left: 152px;
    top: 62px;
}

.form__previewImage img {
    height: 80px;
    width: 60px;
    border-radius: 13px;
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

.form__section input:nth-child(5) {
    border: none;
    outline: none;
    text-transform: none;
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

.tip__icon {
    position: relative;
    display: inline-block;
}

.tip__icon svg {
    width: 15px;
    height: 15px;
}

.tip__helpText {
    visibility: hidden;
    width: 200px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -100px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tip__helpText::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

.tip__icon:hover .tip__helpText {
    visibility: visible;
    opacity: 1;
}

</style>