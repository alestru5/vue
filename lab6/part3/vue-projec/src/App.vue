<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/" class="nav-link">Список задач</router-link>
      <router-link to="/add" class="nav-link">Добавить задачу</router-link>
      <router-link to="/about" class="nav-link">О нас</router-link>
    </nav>

    <RouterView />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app {
  min-height: 100vh;
}

.nav {
  background-color: #333;
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #444;
}

.router-link-active {
  background-color: #4CAF50;
}
</style>
