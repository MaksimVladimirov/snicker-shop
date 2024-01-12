<script setup>
import Card from './Card.vue'
const onClickAdd = () => {
    alert('add')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      imageUrl="/sneakers/sneakers-1.jpg"
      title="Зеленый кросовка"
      :price="5000"
      :isAdded="true"
      :isFavorite="true"
      :onCLickAdd="onClickAdd"
    />
  </div>
</template>
