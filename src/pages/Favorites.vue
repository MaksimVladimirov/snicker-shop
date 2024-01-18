<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://9e5263ce0c7354f2.mokky.dev/favorites?_relations=sneakers'
    )
    //@ts-ignore
    favorites.value = data.map((obj) => obj.sneaker)
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <CardList :items="favorites" is-favorites />
</template>
