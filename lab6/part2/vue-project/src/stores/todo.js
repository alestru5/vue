import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),

  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    incompleteTodos: (state) => state.todos.filter(todo => !todo.completed)
  },

  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}?userId=1`)
        this.todos = response.data
        this.error = null
      } catch (error) {
        this.error = 'Ошибка при загрузке задач'
        console.error('Error fetching todos:', error)
      } finally {
        this.loading = false
      }
    },

    async addTodo(title) {
      this.loading = true
      try {
        const response = await axios.post(API_URL, {
          title,
          completed: false,
          userId: 1
        })
        this.todos.push(response.data)
        this.error = null
      } catch (error) {
        this.error = 'Ошибка при добавлении задачи'
        console.error('Error adding todo:', error)
      } finally {
        this.loading = false
      }
    },

    async toggleTodo(todoId) {
      const todo = this.todos.find(t => t.id === todoId)
      if (!todo) return

      this.loading = true
      try {
        const response = await axios.patch(`${API_URL}/${todoId}`, {
          completed: !todo.completed
        })
        const index = this.todos.findIndex(t => t.id === todoId)
        if (index !== -1) {
          this.todos[index] = response.data
        }
        this.error = null
      } catch (error) {
        this.error = 'Ошибка при обновлении задачи'
        console.error('Error toggling todo:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteTodo(todoId) {
      this.loading = true
      try {
        await axios.delete(`${API_URL}/${todoId}`)
        this.todos = this.todos.filter(todo => todo.id !== todoId)
        this.error = null
      } catch (error) {
        this.error = 'Ошибка при удалении задачи'
        console.error('Error deleting todo:', error)
      } finally {
        this.loading = false
      }
    }
  }
}) 