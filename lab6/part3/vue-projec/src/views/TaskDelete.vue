<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()

onMounted(() => {
  const todoId = Number(route.params.id)
  todoStore.deleteTodo(todoId)
  alert('Task deleted')
  router.push('/')
})
</script>

<template>
  <div class="loading">
    Удаление задачи...
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style> 