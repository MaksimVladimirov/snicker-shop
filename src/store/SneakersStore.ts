import { defineStore } from 'pinia'
import axios from 'axios'
import type { FavoritesInfo } from '@/pages/Home.vue'

export interface SnickersInfo {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite?: boolean
  isAdded?: boolean
  favoriteId?: null | number
}

type SneakerParams = {
  sortBy: string
  title?: string
}

export interface FiltersParams {
    sortBy: string
    searchQuery: string
}

export const useSneakersStore = defineStore('sneakers', {
  state: () => ({
    items: [] as SnickersInfo[],
    filters: {
      sortBy: 'title',
      searchQuery: ''
    } as FiltersParams
  }),

  actions: {
    async fetchItems() {
      try {
        const params: SneakerParams = {
          sortBy: this.filters.sortBy
        }

        if (this.filters.searchQuery) {
          params.title = `*${this.filters.searchQuery}*`
        }

        const { data } = await axios.get('https://9e5263ce0c7354f2.mokky.dev/sneakers', {
          params
        })

        this.items = data.map((obj: SnickersInfo) => ({
          ...obj,
          isFavorite: false,
          isAdded: false,
          favoriteId: null
        }))
        return this.items
      } catch (error) {
        console.error(error)
      }
    },
    async fetchFavorites() {
      try {
        const { data: favorites } = await axios.get('https://9e5263ce0c7354f2.mokky.dev/favorites')
        this.items = this.items.map((item) => {
          const favorite = favorites.find(
            (favorite: FavoritesInfo) => favorite.sneaker_id === item.id
          )
          if (!favorite) {
            return item
          }

          return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
