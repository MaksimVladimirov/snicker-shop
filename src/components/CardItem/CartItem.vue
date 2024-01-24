<script setup lang="ts">
import { useCartStore } from '@/store/CartStore';
import type { CardItemProps } from './CardItemProps'

defineProps<CardItemProps>()
const { removeFromCart } = useCartStore()

</script>

<template>
  <div class="flex border border-slate-200 p-4 rounded-xl gap-4 mt-4">
    <img class="w-16 h-16" :src="item.imageUrl" :alt="item.title" />
    <div class="flex flex-col flex-1">
      <p>{{ item.title }}</p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ item.price }}rub</b>
        <img
          @click="removeFromCart(item)"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
