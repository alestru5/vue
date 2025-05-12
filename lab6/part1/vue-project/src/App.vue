<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, computed } from 'vue';

const schema = yup.object({
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  password: yup.string()
    .min(8, 'Минимум 8 символов')
    .matches(/[0-9]/, 'Должна быть хотя бы одна цифра')
    .matches(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
    .matches(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
    .matches(/[!@#$%^&*]/, 'Должен быть хотя бы один спецсимвол')
    .required('Пароль обязателен'),
});

const { handleSubmit, values, errors, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: ''
  }
});

const agreed = ref(false);

const isFormValid = computed(() => {
  return values.email && values.password && agreed.value && 
         passwordCriteria.value.length && 
         passwordCriteria.value.numbers && 
         passwordCriteria.value.lowercase && 
         passwordCriteria.value.uppercase && 
         passwordCriteria.value.special;
});

const passwordCriteria = computed(() => ({
  length: values.password.length >= 8,
  numbers: /[0-9]/.test(values.password),
  lowercase: /[a-z]/.test(values.password),
  uppercase: /[A-Z]/.test(values.password),
  special: /[!@#$%^&*]/.test(values.password),
}));

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values);
});
</script>

<template>
  <div class="container">
    <form @submit="onSubmit" class="registration-form">
      <h2>Регистрация</h2>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="values.email"
          type="email"
          :class="{ 'error': errors.email, 'success': !errors.email && values.email }"
        />
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <div class="password-container">
          <input
            id="password"
            v-model="values.password"
            type="password"
            :class="{ 'error': errors.password, 'success': !errors.password && values.password }"
          />
          <div class="password-criteria">
            <div :class="{ 'criterion': true, 'met': passwordCriteria.length }">
              Длина не менее 8
            </div>
            <div :class="{ 'criterion': true, 'met': passwordCriteria.numbers }">
              Цифры
            </div>
            <div :class="{ 'criterion': true, 'met': passwordCriteria.lowercase }">
              Буквы нижнего регистра
            </div>
            <div :class="{ 'criterion': true, 'met': passwordCriteria.uppercase }">
              Буквы верхнего регистра
            </div>
            <div :class="{ 'criterion': true, 'met': passwordCriteria.special }">
              Спецсимволы
            </div>
          </div>
        </div>
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="form-group checkbox">
        <input
          id="agreement"
          type="checkbox"
          v-model="agreed"
        />
        <label for="agreement">I agree with license agreement</label>
      </div>

      <button type="submit" :disabled="!isFormValid">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.registration-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input.error {
  border-color: #ff4444;
}

input.success {
  border-color: #00C851;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox input {
  margin: 0;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

.password-container {
  display: flex;
  gap: 1rem;
}

.password-container input {
  width: 200px;
}

.password-criteria {
  flex: 1;
  font-size: 0.875rem;
}

.criterion {
  color: #ff4444;
  margin-bottom: 0.25rem;
}

.criterion.met {
  color: #00C851;
}
</style>
