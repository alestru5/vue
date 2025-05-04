<script setup>
import TodoList from './components/TodoList.vue'
</script>

<template>
  <div class="app">
    <header>
      <h1>Лабораторная работа 5 Advanced Vue</h1>
    </header>
    <main>
      <TodoList />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  color: #333;
}

.app {
  min-height: 100vh;
  padding: 20px;
}

header {
  max-width: 800px;
  margin: 0 auto 40px;
}

header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
  padding: 20px 0;
  text-align: center;
}

main {
  max-width: 800px;
  margin: 0 auto;
}

* {
  box-sizing: border-box;
}
</style>
