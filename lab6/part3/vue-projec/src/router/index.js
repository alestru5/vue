import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/TodoList.vue'
import AddTodo from '../views/AddTodo.vue'
import TaskDetail from '../views/TaskDetail.vue'
import TaskComplete from '../views/TaskComplete.vue'
import TaskDelete from '../views/TaskDelete.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList
    },
    {
      path: '/add',
      name: 'add',
      component: AddTodo
    },
    {
      path: '/task/:id',
      name: 'task',
      component: TaskDetail
    },
    {
      path: '/task/:id/complete',
      name: 'task-complete',
      component: TaskComplete
    },
    {
      path: '/task/:id/delete',
      name: 'task-delete',
      component: TaskDelete
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router 