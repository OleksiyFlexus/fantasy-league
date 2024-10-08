<template>
    <div>
        <div class="data__barSection">
            <AddButton @click="openModal" />
            <p>Показано результатів: {{ players.length }}</p>
        </div>
        <ModalWindow :isActive="isModalActive" @close="closeModal">
            <PlayerCard :initialFormValues="initialFormValues" />
            <CreatePlayerForm :initialFormValues="initialFormValues" :changeFormValue="changeFormValue"
                :handlePhotoUpload="handlePhotoUpload" />
            <div class="button__container">
                <CloseButton @click="close" />
                <SaveButton @click="createPlayer" />
            </div>
        </ModalWindow>
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


const emit = defineEmits(['player-created']);

const players = ref([]);

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
                const fileRef = storageRef(storage, `players/${initialFormValues.name}_${initialFormValues.surname}_${initialFormValues.number}_${initialFormValues.photo}`);
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

            await findAllPlayers();
            close();
        } catch (error) {
            console.error('Помилка при створенні гравця:', error);
        }
    } else {
        console.log('Заповніть данні гравця');
    }
};

const updatePlayerPhoto = async (playerId, photoUrl) => {
    try {
        const playerDocRef = doc(firestoreDb, 'players', playerId);
        await updateDoc(playerDocRef, { photo: photoUrl });
    } catch (error) {
        console.error('Помилка при оновленні фото гравця:', error);
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
            console.log('Гравців не знайдено в БД');
        } else {
            players.value = playerDocs.map((doc) => doc);
        }
    } catch (error) {
        console.error('Помилка при завантаженні данних гравців:', error);
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


<style scoped>
.data__barSection {
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 16px;
    font-weight: 600;
}

.button__container {
    display: flex;
    justify-content: center;
    gap: 20px;
}
</style>