<script setup>
import { ref, defineEmits, defineProps, useSlots } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['button-clicked'])
const count = ref(0)
const slots = useSlots()

function handleClick() {
  count.value += props.amount
  emit('button-clicked')
}
</script>

<template>
  <div class="clicker">
    <p class="label">Счетчик:</p>
    <div class="clicks">{{ count }}</div>
    <span @click="handleClick">
      <slot>
        <button>Кликнуть</button>
      </slot>
    </span>
  </div>
</template>

<style scoped>
.clicker {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-width: 120px;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 8px #e0e0e0;
}
.label {
  color: #2196f3;
  font-weight: bold;
  margin-bottom: 0;
}
.clicks {
  font-size: 2rem;
  font-weight: bold;
  color: #2196f3;
  margin-bottom: 8px;
}
button, span > * {
  font-size: 16px;
  padding: 6px 16px;
  margin-top: 8px;
  cursor: pointer;
}
</style> 