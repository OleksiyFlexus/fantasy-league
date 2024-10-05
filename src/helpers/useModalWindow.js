import { ref } from "vue";

export function useModalWindow() {
  const isModalActive = ref(false);

  const openModal = () => {
    isModalActive.value = true;
    document.body.classList.add('no-scroll');
};

  function closeModal() {
    isModalActive.value = false;
    document.body.classList.remove('no-scroll');
  }


  return {
    isModalActive,
    openModal,
    closeModal,
  };
}
