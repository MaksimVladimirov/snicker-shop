<script setup lang="ts">
import { inject } from 'vue'

import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { Button as AntButton } from 'ant-design-vue'

const { closeDrawer } = inject('cart') as {
  closeDrawer: () => void
}
</script>

<template>
  <div class="drawer-head">
    <ant-button @click="closeDrawer" class="drawer-head__button">
      <arrow-left-outlined class="drawer-head__icon" :rotate="180" />
    </ant-button>
    <h2 class="text-2xl font-bold">Корзина</h2>
  </div>
</template>

<style scoped>
.drawer-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  border: none;
}

.drawer-head__button {
  opacity: 30;
  cursor: pointer;
  transform: rotate(180deg);
  border: none;
}

.drawer-head__button:hover {
  transition: 0.3s;
  translate: -3px;
}

.drawer-head__icon {
  display: flex;
  align-items: center;
  font-size: 16px;
}
</style>
