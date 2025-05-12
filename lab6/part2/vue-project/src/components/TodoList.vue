<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/todo'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const newTodo = ref('')

onMounted(() => {
  todoStore.fetchTodos()
})

const addTodo = async () => {
  if (newTodo.value.trim()) {
    await todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<template>
  <div class="todo-list">
    <h2>Список задач</h2>
    
    <div v-if="todoStore.loading" class="loading">
      Загрузка...
    </div>
    
    <div v-if="todoStore.error" class="error">
      {{ todoStore.error }}
    </div>

    <div class="add-todo">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Добавить новую задачу"
        type="text"
      />
      <button @click="addTodo" :disabled="!newTodo.trim()">Добавить</button>
    </div>

    <div class="todos">
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @toggle="todoStore.toggleTodo"
        @delete="todoStore.deleteTodo"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  color: #666;
  margin: 20px 0;
}

.error {
  color: #ff4444;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #ffeeee;
  border-radius: 4px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.todos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style> 