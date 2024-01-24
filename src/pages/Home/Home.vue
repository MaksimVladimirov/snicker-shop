<script setup lang="ts">
import { watch, onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Spin as AntSpin } from 'ant-design-vue'

import { useSneakersStore } from '@/store/SneakersStore'
import { Select as AntSelect } from 'ant-design-vue'
import { Input as AntInput } from 'ant-design-vue'
import CardList from '@/components/CardList/CardList.vue'
import { useCartStore } from '@/store/CartStore'

const { items, filters } = storeToRefs(useSneakersStore())
const { fetchItems, fetchFavorites } = useSneakersStore()
const { cart } = storeToRefs(useCartStore())
const isLoading = ref<boolean>(false)

const onChangeSearchInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    filters.value.searchQuery = event.target.value
  }
}

const onChangeSelect = (value: any) => {
  filters.value.sortBy = value
}

onBeforeMount(async () => {
  isLoading.value = true
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
  isLoading.value = false
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
      <ant-input
        class="ant-input"
        placeholder="Поиск"
        @input="onChangeSearchInput"
        :allowClear="true"
      >
        <img src="/search.svg" alt="Search" class="absolute left-3 top-2.5" />
      </ant-input>
    </div>
  </div>
  <div class="mt-10">
    <ant-spin :spinning="isLoading">
      <CardList :items="items" />
    </ant-spin>
  </div>
</template>

<style scoped>
.ant-select {
  width: 180px;
}
.ant-input {
  width: 220px;
}
</style>
