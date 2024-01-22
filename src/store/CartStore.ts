import { defineStore } from 'pinia'
import type { SnickersInfo } from './SneakersStore'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as SnickersInfo[]
  }),

  actions: {
    addToCart(item: SnickersInfo) {
      this.cart.push(item)
      item.isAdded = true
    },

    removeFromCart(item: SnickersInfo) {
      this.cart.splice(this.cart.indexOf(item), 1)
      item.isAdded = false
    },

    async addToFavorite(item: SnickersInfo) {
      try {
        if (!item.isFavorite) {
          const obj = {
            sneaker_id: item.id
          }
          item.isFavorite = true
          const { data } = await axios.post('https://9e5263ce0c7354f2.mokky.dev/favorites', obj)
          item.favoriteId = data.id
        } else {
          item.isFavorite = false
          await axios.delete(`https://9e5263ce0c7354f2.mokky.dev/favorites/${item.favoriteId}`)
          item.favoriteId = null
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
})
