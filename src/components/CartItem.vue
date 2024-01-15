<script setup lang="ts">
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onCLickAdd: Function,
  onCLickFavorite: Function
})
</script>

<template>
  <div class="flex border border-slate-200 p-4 rounded-xl gap-4 mt-4">
    <img class="w-16 h-16" src="/sneakers/sneakers-1.jpg" alt="Sneaker" />
    <div class="flex flex-col justify-between">
      <p>Кросовка nike air max 280</p>
      <div class="flex justify-between mt-2">
        <b>12 990 rub</b>
        <img
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
