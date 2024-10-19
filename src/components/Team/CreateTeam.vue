<template>
  <div>
      <div class="data__barSection">
          <AddButton button-text="Додати команду" @click="openModal" />
      </div>
      <ModalWindow :isActive="isModalActive" @close="closeModal">
          <CreateTeamForm :initialFormValues="initialFormValues" :handleLogoUpload="handleLogoUpload" />
          <div class="button__container">
              <CloseButton @click="closeModal" />
              <SaveButton @click="createTeam" />
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
import { createTeamInDb, findAllTeamInDb } from '@/api/team.js';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { getDatabase, ref as dbRef, update } from 'firebase/database';
import { useModalWindow } from '@/helpers/useModalWindow';
import ModalWindow from '../ModalWindow.vue';
import CreateTeamForm from '../Team/CreateTeamForm.vue';
import AddButton from '../AddButton.vue';
import CloseButton from '../CloseButton.vue';
import SaveButton from '../SaveButton.vue';
import NotificationWindow from '../NotificationWindow.vue';

const emit = defineEmits(['team-created']);
const error = ref(null);
const showNotification = ref(false);
const notificationMessage = ref('');

const { isModalActive, openModal, closeModal } = useModalWindow();
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
          const teamId = await createTeamInDb(teamData); // Создаем команду в Realtime Database и получаем ID

          if (initialFormValues.file) {
              const storage = getStorage();
              const fileRef = storageRef(storage, `teams/${initialFormValues.teamName}_${initialFormValues.file.name}`);
              const uploadTask = uploadBytesResumable(fileRef, initialFormValues.file);

              const logoUrl = await new Promise((resolve, reject) => {
                  uploadTask.on(
                      'state_changed',
                      (snapshot) => {
                          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                          console.log(`Загрузка на ${progress}% завершена`);
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
              await updateTeamLogo(teamId, logoUrl); // Обновляем URL логотипа в базе данных
          }

          emit('team-created', teamData);

          notificationMessage.value = `Командa ${teamData.teamName} була успішно створена!`;
          showNotification.value = true;

          await findAllTeams();
          close();
      } catch (err) {
          error.value = "Помилка при створенні команди";
      }
  } else {
      error.value = "Введіть назву команди (логотип не обов'язково)";
  }
};

const updateTeamLogo = async (teamId, logoUrl) => {
  try {
      const db = getDatabase();
      const teamRef = dbRef(db, `teams/${teamId}`);
      await update(teamRef, { logo: logoUrl }); // Обновляем логотип в Realtime Database
  } catch (err) {
      error.value = "Помилка при оновленні логотипу команди";
  }
};

const findAllTeams = async () => {
  try {
      const teamsFromDb = await findAllTeamInDb();
      teams.value = teamsFromDb;
  } catch (err) {
      error.value = "Помилка при завантаженні даних команд:";
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
