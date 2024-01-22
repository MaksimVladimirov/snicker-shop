<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import CardList from '../components/CardList.vue'
import { useSneakersStore } from '../store/SneakersStore'
import { useCartStore } from '@/store/CartStore'

const { items, filters } = storeToRefs(useSneakersStore())
const { fetchItems, fetchFavorites } = useSneakersStore()

const { cart } = storeToRefs(useCartStore())

export interface SnickersInfo {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite?: boolean
  isAdded?: boolean
  favoriteId?: null | number
}

export interface FavoritesInfo {
  sneaker_id: number
  id: number
}

const onChangeSearchInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    filters.value.searchQuery = event.target.value
  }
}

const onChangeSelect = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    filters.value.sortBy = event.target.value
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" id="" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img src="/search.svg" alt="Search" class="absolute left-3 top-2.5" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" />
  </div>
</template>
