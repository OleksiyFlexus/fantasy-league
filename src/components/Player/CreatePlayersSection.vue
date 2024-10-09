<template>
    <div>
        <AddButton @click="openModal" />
        <ModalWindow :isActive="isModalActive" @close="closeModal">
            <PlayerCard :initialFormValues="initialFormValues" />
            <CreatePlayerForm :initialFormValues="initialFormValues" :changeFormValue="changeFormValue"
                :handlePhotoUpload="handlePhotoUpload" />
            <div class="button__container">
                <CloseButton @click="close" />
                <SaveButton @click="createPlayer" />
            </div>
            <div v-if="error" class="error_message">
                {{ error }}
            </div>
        </ModalWindow>
        <NotificationWindow :message="notificationMessage" :visible="showNotification"/>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useModalWindow } from '@/helpers/useModalWindow';
import { createPlayerInDb, findAllPlayerInDb } from '@/api/player.js';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { firestoreDb } from '@/firebase';
import { doc, updateDoc } from '@firebase/firestore';
import AddButton from '../AddButton.vue';
import ModalWindow from '../ModalWindow.vue';
import CreatePlayerForm from './CreatePlayerForm.vue';
import PlayerCard from './PlayerCard.vue';
import SaveButton from '../SaveButton.vue';
import CloseButton from '../CloseButton.vue';
import NotificationWindow from '../NotificationWindow.vue';

const emit = defineEmits(['player-created']);
const showNotification = ref(false);
const notificationMessage = ref ('');

const players = ref([]);
const error = ref(null);

let initialFormValues = reactive({ name: '', surname: '', number: '', photo: '', photoRef: {}, photoName: '' });

const { isModalActive, openModal, closeModal } = useModalWindow();

const close = () => {
    Object.assign(initialFormValues, { name: '', surname: '', number: '', photo: '', photoRef: {}, photoName: '' });
    closeModal();
};

const createPlayer = async () => {
    if (initialFormValues.surname && initialFormValues.number) {
        try {
            const playerData = { name: initialFormValues.name, surname: initialFormValues.surname, number: initialFormValues.number, photo: '' };
            const playerId = await createPlayerInDb(playerData);

            if (initialFormValues.file) {
                const storage = getStorage();
                const fileRef = storageRef(storage, `players/${initialFormValues.name} ${initialFormValues.surname} ${initialFormValues.number} ${initialFormValues.photo}`);
                const uploadTask = uploadBytesResumable(fileRef, initialFormValues.file);

                const photoUrl = await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload is ${progress}% done`);
                        },
                        (error) => {
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                    );
                });
                playerData.photo = photoUrl;
                await updatePlayerPhoto(playerId, photoUrl);
            }
            emit('player-created', playerData);

            notificationMessage.value = `Гравець ${playerData.name} ${playerData.surname} був успішно створений!`;
            showNotification.value = true;

            await findAllPlayers();
            close();
        } catch (err) {
            error.value = "Помилка при створенні гравця:";
        }
    } else {
        error.value = "Заповніть данні гравця (фото не обов`язково)";
    }
};

const updatePlayerPhoto = async (playerId, photoUrl) => {
    try {
        const playerDocRef = doc(firestoreDb, 'players', playerId);
        await updateDoc(playerDocRef, { photo: photoUrl });
    } catch (err) {
        error.value = "Помилка при оновленні фото гравця:";
    }
};

const changeFormValue = (type, value) => {
    if (type in initialFormValues) {
        if (type === 'number') {
            if (value === 0) {
                return;
            }
            if (value.length <= 2) {
                initialFormValues[type] = value;
            } else {
                initialFormValues[type] = value.slice(0, 2);
            }
        }
    }
};

const findAllPlayers = async () => {
    try {
        const playerDocs = await findAllPlayerInDb();
        if (playerDocs.empty) {
            error.value = "Гравців не знайдено в БД";
        } else {
            players.value = playerDocs.map((doc) => doc);
        }
    } catch (error) {
        error.value = "Помилка при завантаженні данних гравців:";
    }
};

onMounted(async () => {
    await findAllPlayers();
});

const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    initialFormValues.file = file;
    initialFormValues.fileName = file.name;
};

</script>


<style>
.button__container {
    display: flex;
    justify-content: center;
    gap: 20px;
}
</style>