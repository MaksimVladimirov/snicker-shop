<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import CardList from './components/CardList.vue'
// @ts-ignore
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const cart = ref([])
const isCreatingOrder = ref(false)
const isDrawerOpen = ref(false)
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
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
// @ts-ignore
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const addToCart = (item) => {
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

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://19ce0717f24b28a6.mokky.dev/favorites')
    // @ts-ignore
    items.value = items.value.map((item) => {
      // @ts-ignore
      const favorite = favorites.find((favorite) => favorite.id === item.id)
      if (!favorite) {
        return item
      }

      return {
        // @ts-ignore
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.error(error)
  }
}
// @ts-ignore
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      // @ts-ignore
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get('https://9e5263ce0c7354f2.mokky.dev/sneakers', {
      params
    })
    // @ts-ignore
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (error) {
    console.error(error)
  }
}
// @ts-ignore
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('https://19ce0717f24b28a6.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://19ce0717f24b28a6.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

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
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
        <div class="flex gap-4">
          <select @change="onChangeSelect" id="" class="py-2 px-3 border rounded-md outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img src="/search.svg" alt="Search" class="absolute left-3 top-2.5" />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400"
              placeholder="Поиск"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
      </div>
    </div>
  </div>
</template>
