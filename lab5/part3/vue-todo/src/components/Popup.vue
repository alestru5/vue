<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  message: {
    type: String,
    default: 'Вы уверены?'
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="popup-overlay">
      <div class="popup">
        <div class="popup-icon">!</div>
        <h2>{{ message }}</h2>
        <p>Пожалуйста, подтвердите действие</p>
        <div class="popup-buttons">
          <button class="cancel-btn" @click="emit('cancel')">Отмена</button>
          <button class="confirm-btn" @click="emit('confirm')">Да, удалить</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.popup-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff3e0;
  color: #ff9800;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn {
  background: #2196f3;
  color: white;
}

.confirm-btn:hover {
  background: #1976d2;
}

h2 {
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.5rem;
}

p {
  color: #666;
  margin: 0;
}
</style> 