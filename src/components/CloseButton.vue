<template>
  <button class="close__modalBtn">
    <span>Закрити</span>
  </button>
</template>

<script setup>

</script>

<style scoped>
.close__modalBtn {
  background-color: #f4511e;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
}

.close__modalBtn:hover {
  opacity: 1;
}
</style>