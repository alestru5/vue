<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <div class="todo-item" :class="{ 'completed': todo.completed }">
    <label class="checkbox-container">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      />
      <span class="checkmark"></span>
      <span class="todo-text">{{ todo.title }}</span>
    </label>
    <button class="delete-btn" @click="emit('delete', todo.id)">×</button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex: 1;
}

input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  position: relative;
}

input:checked + .checkmark {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

input:checked + .checkmark:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-text {
  font-size: 16px;
  color: #333;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 20px;
  cursor: pointer;
  padding: 0 10px;
}

.delete-btn:hover {
  color: #cc0000;
}
</style> 