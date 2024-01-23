<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { storeToRefs } from 'pinia';

import { useCartStore } from './store/CartStore'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const { cart } = storeToRefs(useCartStore())
const isDrawerOpen = ref(false)
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  isDrawerOpen.value = false
}
const openDrawer = () => {
  isDrawerOpen.value = true
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  },
  { deep: true }
)
provide('cart', {
  closeDrawer,
  openDrawer
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @open-drawer="openDrawer" :total-price="totalPrice" />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>
