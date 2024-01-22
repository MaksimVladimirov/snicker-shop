<script setup lang="ts">
import { Divider as AntDivider } from 'ant-design-vue'
const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кросовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="" />
        <span>{{ totalPrice }} rub</span>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="" />
          <span>Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
  <AntDivider></AntDivider>
</template>
