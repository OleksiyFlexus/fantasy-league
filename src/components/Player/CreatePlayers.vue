<template>
  <div>
    <AddButton @click="openModal" />
    <ModalWindow :isActive="isModalActive" @close="closeModal">
      <PlayerCard :initialFormValues="initialFormValues" />
      <CreatePlayerForm
        :initialFormValues="initialFormValues"
        :changeFormValue="changeFormValue"
        :handlePhotoUpload="handlePhotoUpload"
      />
      <div class="button__container">
        <CloseButton @click="close" />
        <SaveButton @click="createPlayer" />
      </div>
      <div v-if="error" class="error_message">
        {{ error }}
      </div>
    </ModalWindow>
    <NotificationWindow
      :message="notificationMessage"
      :visible="showNotification"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  getDatabase,
  ref as dbRef,
  set,
  push,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import AddButton from "../AddButton.vue";
import ModalWindow from "../ModalWindow.vue";
import CreatePlayerForm from "../Player/CreatePlayerForm.vue";
import PlayerCard from "../Player/PlayerCard.vue";
import SaveButton from "../SaveButton.vue";
import CloseButton from "../CloseButton.vue";
import NotificationWindow from "../NotificationWindow.vue";
import { useModalWindow } from "@/helpers/useModalWindow";

const emit = defineEmits(["player-created"]);
const showNotification = ref(false);
const notificationMessage = ref("");

const players = ref([]);
const error = ref(null);
let errorTimeout = null;

const displayError = (message) => {
  error.value = message;

  // Сбрасываем таймер, если он уже установлен
  if (errorTimeout) {
    clearTimeout(errorTimeout);
  }

  // Устанавливаем таймер для скрытия сообщения через 1 секунду
  errorTimeout = setTimeout(() => {
    error.value = null; // Сбрасываем сообщение об ошибке
  }, 1000);
};

let initialFormValues = reactive({
  name: "",
  surname: "",
  number: "",
  photo: "",
  photoRef: {},
  photoName: "",
});

const { isModalActive, openModal, closeModal } = useModalWindow();

const close = () => {
  Object.assign(initialFormValues, {
    name: "",
    surname: "",
    number: "",
    photo: "",
    photoRef: {},
    photoName: "",
  });
  closeModal();
};

const createPlayer = async () => {
  if (initialFormValues.surname && initialFormValues.number) {
    try {
      const db = getDatabase();
      const newPlayerRef = push(dbRef(db, "players"));
      const playerData = {
        name: initialFormValues.name,
        surname: initialFormValues.surname,
        number: initialFormValues.number,
        photo: "",
      };

      if (initialFormValues.file) {
        const storage = getStorage();
        const fileRef = storageRef(
          storage,
          `players/${initialFormValues.name}_${initialFormValues.surname}_${initialFormValues.number}_${initialFormValues.photo}`
        );
        const uploadTask = uploadBytesResumable(
          fileRef,
          initialFormValues.file
        );

        const photoUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      }

      await set(newPlayerRef, playerData);
      emit("player-created", playerData);

      notificationMessage.value = `Гравець ${playerData.name} ${playerData.surname} був успішно створений!`;
      showNotification.value = true;

      close();
    } catch (err) {
      console.error("Error occurred:", err); // Логируем ошибку
      displayError("Помилка при створенні гравця: " + err.message);
    }
  } else {
    displayError("Заповніть данні гравця (фото не обов'язково)");
  }
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  initialFormValues.file = file;
  initialFormValues.fileName = file.name;
};

const changeFormValue = (type, value) => {
  if (type in initialFormValues) {
    if (type === "number") {
      if (value === 0) {
        return;
      }
      initialFormValues[type] = value.slice(0, 2);
    } else {
      initialFormValues[type] = value;
    }
  }
};
</script>

<style>
.button__container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
