<script setup lang="ts">
import { useCartStore } from '@/store/CartStore'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = useCartStore()
</script>

<template>
  <div class="flex flex-col gap-3 flex-1" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
