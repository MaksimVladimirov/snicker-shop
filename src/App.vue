<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

// Корзина
const cart = ref([])
const isDrawerOpen = ref(false)
//@ts-ignore
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  isDrawerOpen.value = false
}
const openDrawer = () => {
  isDrawerOpen.value = true
}
//@ts-ignore
const addToCart = (item) => {
  //@ts-ignore

  cart.value.push(item)
  item.isAdded = true
}

//@ts-ignore
const removeFromCart = (item) => {
  //@ts-ignore

  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}
//

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer
    v-if="isDrawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
  />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @open-drawer="openDrawer" :total-price="totalPrice" />
    <div class="p-10">
      <router-view> </router-view>
      <!-- <Home /> -->
    </div>
  </div>
</template>
