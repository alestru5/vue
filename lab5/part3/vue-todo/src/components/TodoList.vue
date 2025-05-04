<script setup>
import { ref, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'
import Popup from './Popup.vue'

const todos = ref([])
const newTodo = ref('')
const showPopup = ref(false)
const todoToDelete = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Используем userId=1 для примера
const USER_ID = 1
const API_BASE = 'https://jsonplaceholder.typicode.com'

// Загрузка начальных задач
onMounted(async () => {
  try {
    const response = await fetch(`${API_BASE}/users/${USER_ID}/todos`)
    if (!response.ok) throw new Error('Ошибка загрузки задач')
    const data = await response.json()
    todos.value = data.slice(0, 5) // Берем первые 5 задач для примера
    isLoading.value = false
  } catch (e) {
    error.value = 'Не удалось загрузить задачи: ' + e.message
    isLoading.value = false
  }
})

const addTodo = async () => {
  if (!newTodo.value.trim()) return

  try {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title: newTodo.value.trim(),
        completed: false,
        userId: USER_ID
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (!response.ok) throw new Error('Ошибка при добавлении задачи')
    
    const newTask = await response.json()
    todos.value.push(newTask)
    newTodo.value = ''
  } catch (e) {
    error.value = 'Не удалось добавить задачу: ' + e.message
  }
}

const toggleTodo = async (id) => {
  try {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return

    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !todo.completed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (!response.ok) throw new Error('Ошибка при обновлении задачи')
    
    const updatedTodo = await response.json()
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], completed: updatedTodo.completed }
    }
  } catch (e) {
    error.value = 'Не удалось обновить задачу: ' + e.message
  }
}

const confirmDelete = (id) => {
  todoToDelete.value = id
  showPopup.value = true
}

const handleConfirmDelete = async () => {
  try {
    const response = await fetch(`${API_BASE}/todos/${todoToDelete.value}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Ошибка при удалении задачи')
    
    todos.value = todos.value.filter(t => t.id !== todoToDelete.value)
    showPopup.value = false
    todoToDelete.value = null
  } catch (e) {
    error.value = 'Не удалось удалить задачу: ' + e.message
  }
}

const handleCancelDelete = () => {
  showPopup.value = false
  todoToDelete.value = null
}
</script>

<template>
  <div class="todo-list">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="isLoading" class="loading">
      Загрузка задач...
    </div>

    <template v-else>
      <div class="add-todo">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Добавить новую задачу..."
          type="text"
        >
        <button @click="addTodo">Добавить</button>
      </div>

      <div class="todos">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo(todo.id)"
          @delete="confirmDelete(todo.id)"
        />
      </div>

      <Popup
        :show="showPopup"
        message="Вы уверены, что хотите удалить эту задачу?"
        @confirm="handleConfirmDelete"
        @cancel="handleCancelDelete"
      />
    </template>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.add-todo {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-todo input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.add-todo input:focus {
  outline: none;
  border-color: #2196f3;
}

.add-todo button {
  padding: 0.75rem 1.5rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.add-todo button:hover {
  background: #1976d2;
}

.todos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-message {
  padding: 1rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style> 