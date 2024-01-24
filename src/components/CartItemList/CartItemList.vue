<script setup lang="ts">
import { useCartStore } from '@/store/CartStore'
import CartItem from '../CardItem/CartItem.vue'

const { cart } = useCartStore()
</script>

<template>
  <div class="flex flex-col gap-3 flex-1" v-auto-animate>
    <CartItem v-for="item in cart" :item="item" :key="item.id" />
  </div>
</template>
