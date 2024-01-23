<script setup lang="ts">
import type { ISneakers } from '@/types/ISneakers'
import { useCartStore } from '@/store/CartStore'
import Card from './Card.vue'

defineProps({
  items: Array<ISneakers>,
  isFavorites: Boolean
})

const { addToCart, removeFromCart, addToFavorite } = useCartStore()

const onClickAddPlus = (item: ISneakers) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onClickFavorite="isFavorites ? null : () => addToFavorite(item)"
      :onClickAdd="isFavorites ? null : () => onClickAddPlus(item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
