import { ref } from "vue";

export function useModalWindow() {
  const isShowModal = ref(false);

  function closeModal() {
    isShowModal.value = false;
  }

  function showModal() {
    isShowModal.value = true;
  }
  return {
    isShowModal,
    showModal,
    closeModal,
  };
}
