export interface CardProps {
  imageUrl: string,
  title: string,
  price: number,
  isFavorite: boolean,
  isAdded: boolean,
  onClickFavorite: () => void,
  onClickAdd: () => void
}