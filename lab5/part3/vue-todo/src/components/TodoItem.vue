<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <div class="todo-item">
    <label class="checkbox-container">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      >
      <span class="checkmark"></span>
      <span :class="{ 'completed': todo.completed }">{{ todo.title }}</span>
    </label>
    <button class="delete-btn" @click="emit('delete', todo.id)">
      <span class="delete-icon">🗑</span>
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  flex: 1;
  color: #333;
  font-weight: 400;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: #2196f3;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2196f3;
  border-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.delete-icon {
  font-size: 1.2rem;
}
</style> 