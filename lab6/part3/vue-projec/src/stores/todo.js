import { defineStore } from 'pinia'

const STORAGE_KEY = 'todos'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    nextId: Math.max(0, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').map(t => t.id)) + 1
  }),

  actions: {
    addTodo(title) {
      const todo = {
        id: this.nextId++,
        title,
        completed: false
      }
      this.todos.push(todo)
      this.saveToStorage()
      return todo
    },

    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
        this.saveToStorage()
      }
    },

    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.saveToStorage()
    },

    getTodo(id) {
      return this.todos.find(todo => todo.id === id)
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    }
  }
}) 