<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

import type { ISneakers } from '@/types/ISneakers'
import CardList from '../components/CardList.vue'

const favorites = ref([])

type SneakersInfo = {
  id: number
  sneaker: ISneakers
}

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://9e5263ce0c7354f2.mokky.dev/favorites?_relations=sneakers'
    )
    favorites.value = data.map((obj: SneakersInfo) => obj.sneaker)
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <CardList :items="favorites" is-favorites />
</template>
