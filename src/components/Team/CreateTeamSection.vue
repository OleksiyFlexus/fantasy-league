<template>
    <div>
        <div class="data__barSection">
            <AddButton button-text="Додати команду" @click="openModal" />
            <p>Показано результатів: {{ teams.length }}</p>
        </div>
        <ModalWindow :isActive="isModalActive" @close="closeModal">
            <CreateTeamForm :initialFormValues="initialFormValues" :handleLogoUpload="handleLogoUpload" />
            <div class="button__container">
                <CloseButton @click="closeModal" />
                <SaveButton @click="createTeam" />
            </div>
        </ModalWindow>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { createTeamInDb, findAllTeamInDb } from '@/api/team.js';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useModalWindow } from '@/helpers/useModalWindow';
import { firestoreDb } from '@/firebase';
import { doc, updateDoc } from '@firebase/firestore';
import ModalWindow from '../ModalWindow.vue';
import CreateTeamForm from './CreateTeamForm.vue';
import AddButton from '../AddButton.vue';
import CloseButton from '../CloseButton.vue';
import SaveButton from '../SaveButton.vue';

const { isModalActive, openModal, closeModal } = useModalWindow();

const emit = defineEmits(['team-created']);

const teams = ref([]);

let initialFormValues = reactive({ teamName: '', logo: '', logoRef: {}, logoName: '' });

const close = () => {
    Object.assign(initialFormValues, { teamName: '', logo: '', logoRef: {}, logoName: '' });
    closeModal();
};

const createTeam = async () => {
    if (initialFormValues.teamName) {
        try {
            const teamData = { teamName: initialFormValues.teamName, logo: '' };
            const teamId = await createTeamInDb(teamData);

            if (initialFormValues.file) {
                const storage = getStorage();
                const fileRef = storageRef(storage, `teams/${initialFormValues.teamName}_${initialFormValues.file.name}`);
                const uploadTask = uploadBytesResumable(fileRef, initialFormValues.file);

                const logoUrl = await new Promise((resolve, reject) => {
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

                teamData.logo = logoUrl;
                await updateTeamLogo(teamId, logoUrl);
            }

            emit('team-created', teamData);
            await findAllTeams();
            close();
        } catch (error) {
            console.error('Помилка при створенні команди:', error);
        }
    } else {
        console.log('Заповніть данні команди');
    }
};

const updateTeamLogo = async (teamId, logoUrl) => {
    try {
        const teamDocRef = doc(firestoreDb, 'teams', teamId);
        await updateDoc(teamDocRef, { logo: logoUrl });
    } catch (error) {
        console.error('Помилка при оновленні логотипу команди:', error);
    }
};

const findAllTeams = async () => {
    try {
        const teamDocs = await findAllTeamInDb();
        if (teamDocs.empty) {
            console.log('Команд не знайдено в БД');
        } else {
            teams.value = teamDocs.map((doc) => doc);
        }
    } catch (error) {
        console.error('Помилка при завантаженні данних команди:', error);
    }
};

onMounted(async () => {
    await findAllTeams();
});

const handleLogoUpload = (event) => {
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