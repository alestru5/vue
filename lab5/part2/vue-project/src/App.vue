<script setup>
import Clicker from './components/Clicker.vue'

function handleClicker(n) {
  alert(`Clicker ${n} clicked!`)
}
</script>

<template>
  <div class="page-wrapper">
    <h1>100 независимых кликеров на Vue 3</h1>
    <div class="clickers-wrapper">
      <Clicker
        v-for="n in 100"
        :key="n"
        :amount="n"
        @button-clicked="handleClicker(n)"
      >
        <button :style="{background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px'}">
          +{{ n }} очков
        </button>
      </Clicker>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}
h1 {
  text-align: center;
  margin-bottom: 18px;
  width: 100%;
}
.clickers-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
