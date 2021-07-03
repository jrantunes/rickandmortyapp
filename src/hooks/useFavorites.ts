import { useContext } from 'react'
import { favoritesContext } from '../contexts/FavoritesContext'

export function useFavorites() {
  const value = useContext(favoritesContext)

  // retorna os valores do favoritesContext - { favorites, handleAddCharacterToFavorites, handleRemoveFromFavorites }
  return value
}