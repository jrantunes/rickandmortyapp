import { useContext } from 'react'
import { favoritesContext } from '../contexts/FavoritesContext'

export function useFavorites() {
  const value = useContext(favoritesContext)

  return value
}