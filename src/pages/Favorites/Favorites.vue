<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '@/components/CardList/CardList.vue'
import type { FavoritesInfo } from './FavoritesInfo';

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://9e5263ce0c7354f2.mokky.dev/favorites?_relations=sneakers'
    )
    favorites.value = data.map((obj: FavoritesInfo) => obj.sneaker)
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <CardList :items="favorites" is-favorites />
</template>
