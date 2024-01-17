<script setup lang="ts">
import axios from 'axios'
import { computed, provide, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
// import Home from './pages/Home.vue'

// Корзина
const cart = ref([])
const isCreatingOrder = ref(false)
const isDrawerOpen = ref(false)
//@ts-ignore
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const cartIsEmpty = computed(() => cart.value.length === 0)
const isCartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

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

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://9e5263ce0c7354f2.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []
    return data
  } catch (err) {
    console.error(err)
  } finally {
    isCreatingOrder.value = false
  }
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
    @create-order="createOrder"
    :is-button-disabled="isCartButtonDisabled"
  />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @open-drawer="openDrawer" :total-price="totalPrice" />
    <div class="p-10">
      <router-view> </router-view>
      <!-- <Home /> -->
    </div>
  </div>
</template>
