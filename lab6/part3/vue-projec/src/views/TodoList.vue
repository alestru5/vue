<script setup>
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
</script>

<template>
  <div class="todo-list">
    <h2>Список задач</h2>
    
    <div class="todos">
      <div v-for="todo in todoStore.todos" :key="todo.id" class="todo-item">
        <router-link :to="`/task/${todo.id}`" class="todo-link">
          {{ todo.title }}
        </router-link>
        <div class="todo-actions">
          <router-link :to="`/task/${todo.id}/complete`" class="action-btn complete">
            {{ todo.completed ? 'Отменить' : 'Завершить' }}
          </router-link>
          <router-link :to="`/task/${todo.id}/delete`" class="action-btn delete">
            Удалить
          </router-link>
        </div>
      </div>
    </div>

    <router-link to="/add" class="add-btn">Добавить задачу</router-link>
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

.todos {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.todo-link {
  color: #333;
  text-decoration: none;
  flex: 1;
}

.todo-link:hover {
  color: #4CAF50;
}

.todo-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 4px 8px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
}

.complete {
  background-color: #4CAF50;
  color: white;
}

.delete {
  background-color: #ff4444;
  color: white;
}

.add-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
}

.add-btn:hover {
  background-color: #45a049;
}
</style> 