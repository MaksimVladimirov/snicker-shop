<script setup lang="ts">
import Card from './Card.vue'

defineProps({
  items: Array as () => Array<{
    id: number
    imageUrl: string
    title: string
    price: number
    isFavorite: boolean
    isAdded: boolean
  }>,
  addToFavorite: Function,
  addToCart: Function
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
