import type { ISneakers } from '@/types/ISneakers'

export interface CardListProps {
  items: ISneakers[]
  isFavorites?: boolean
}
