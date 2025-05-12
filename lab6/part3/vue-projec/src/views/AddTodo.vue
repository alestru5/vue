<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const router = useRouter()
const todoStore = useTodoStore()
const title = ref('')

const addTodo = () => {
  if (title.value.trim()) {
    const todo = todoStore.addTodo(title.value.trim())
    title.value = ''
    router.push(`/task/${todo.id}`)
  }
}
</script>

<template>
  <div class="add-todo">
    <h2>Добавить задачу</h2>
    
    <form @submit.prevent="addTodo" class="todo-form">
      <div class="form-group">
        <label for="title">Название задачи:</label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Введите название задачи"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="!title.trim()">Добавить</button>
        <router-link to="/" class="cancel-btn">Отмена</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-todo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.todo-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-btn {
  flex: 1;
  padding: 10px;
  background-color: #f5f5f5;
  color: #666;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
}

.cancel-btn:hover {
  background-color: #e5e5e5;
}
</style> 