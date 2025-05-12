<template>
  <div class="about">
    <h2>О нас</h2>
    
    <div class="content">
      <p>
        Это простое приложение для управления задачами, созданное с использованием Vue.js.
        Оно позволяет создавать, просматривать, редактировать и удалять задачи.
      </p>
      
      <p>
        Все данные хранятся локально в вашем браузере с использованием LocalStorage.
      </p>

      <router-link to="/" class="back-btn">Вернуться к списку задач</router-link>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.back-btn {
  display: block;
  margin-top: 20px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
}

.back-btn:hover {
  background-color: #45a049;
}
</style> 