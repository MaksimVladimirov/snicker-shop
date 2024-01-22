<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import CardList from '../components/CardList.vue'
import { useSneakersStore } from '../store/SneakersStore'
import { useCartStore } from '@/store/CartStore'
import { Select as AntSelect } from 'ant-design-vue'
import { Input as AntInput } from 'ant-design-vue'

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

const onChangeSelect = (value: any) => {
  filters.value.sortBy = value
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

watch(filters.value, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
    <div class="flex gap-4">
      <ant-select @change="onChangeSelect" class="ant-select" placeholder="Сортировать по">
        <a-select-option value="name">По названию</a-select-option>
        <a-select-option value="price">По цене (дешевые)</a-select-option>
        <a-select-option value="-price">По цене (дорогие)</a-select-option>
      </ant-select>
      <ant-input class="ant-input" placeholder="Поиск" @input="onChangeSearchInput" :allowClear="true" style="">
        <img src="/search.svg" alt="Search" class="absolute left-3 top-2.5" />
      </ant-input>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" />
  </div>
</template>

<style>
.ant-select {
  width: 180px;
}

.ant-input {
    width: 220px;
}
</style>
