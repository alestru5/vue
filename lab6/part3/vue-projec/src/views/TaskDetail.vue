<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()

const todo = todoStore.getTodo(Number(route.params.id))

if (!todo) {
  router.push('/')
}
</script>

<template>
  <div v-if="todo" class="task-detail">
    <h2>Детали задачи</h2>
    
    <div class="task-card">
      <h3>{{ todo.title }}</h3>
      <p class="status" :class="{ 'completed': todo.completed }">
        Статус: {{ todo.completed ? 'Завершена' : 'В процессе' }}
      </p>
      
      <div class="actions">
        <router-link :to="`/task/${todo.id}/complete`" class="action-btn complete">
          {{ todo.completed ? 'Отменить' : 'Завершить' }}
        </router-link>
        <router-link :to="`/task/${todo.id}/delete`" class="action-btn delete">
          Удалить
        </router-link>
        <router-link to="/" class="action-btn back">
          Назад к списку
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.task-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.status {
  color: #666;
  margin-bottom: 20px;
}

.status.completed {
  color: #4CAF50;
}

.actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
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

.back {
  background-color: #f5f5f5;
  color: #666;
}
</style> 