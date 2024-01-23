import { defineStore } from 'pinia'
import axios from 'axios'

import type { ISneakers } from '@/types/ISneakers'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as ISneakers[]
  }),

  actions: {
    addToCart(item: ISneakers) {
      this.cart.push(item)
      item.isAdded = true
    },

    removeFromCart(item: ISneakers) {
      this.cart.splice(this.cart.indexOf(item), 1)
      item.isAdded = false
    },

    async addToFavorite(item: ISneakers) {
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
