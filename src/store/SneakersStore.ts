import { defineStore } from 'pinia'
import axios from 'axios'

import type { SneakersParams } from '@/types/SneakersParams'
import type { FiltersParams } from '@/types/FiltersParams'
import type { ISneakers } from '@/types/ISneakers'
import type { IFavorites } from '@/types/IFilters'

export const useSneakersStore = defineStore('sneakers', {
  state: () => ({
    items: [] as ISneakers[],
    filters: {
      sortBy: 'title',
      searchQuery: ''
    } as FiltersParams
  }),

  actions: {
    async fetchItems() {
      try {
        const params: SneakersParams = {
          sortBy: this.filters.sortBy
        }

        if (this.filters.searchQuery) {
          params.title = `*${this.filters.searchQuery}*`
        }

        const { data } = await axios.get('https://9e5263ce0c7354f2.mokky.dev/sneakers', {
          params
        })

        this.items = data.map((obj: ISneakers) => ({
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
          const favorite = favorites.find((favorite: IFavorites) => favorite.sneaker_id === item.id)
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
