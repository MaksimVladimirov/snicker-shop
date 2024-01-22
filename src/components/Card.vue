<script setup lang="ts">
defineProps({
    //@ts-ignore
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  id: Number,
  onClickAdd: Function as any as (payload: MouseEvent) => void,
  onClickFavorite: Function as any as (payload: MouseEvent) => void
})
</script>

<template>
  <div
    class="relative bg-white m-10 border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8"
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="Sneaker" />
    <p class="mt-5">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400"> Цена: </span>
        <b> {{ price }}</b>
      </div>
      <img v-if="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" @click="onClickAdd" />
    </div>
  </div>
</template>
