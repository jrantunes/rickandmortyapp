import { createContext, ReactNode, useEffect, useState } from 'react'

type FavoritesContextProviderProps = {
  children: ReactNode
}

type Character = {
  id: number;
  name: string;
  image: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  episode: string[];
}

type FavoritesContextData = {
  favorites: Character[];
  handleAddCharacterToFavorites: (character: Character) => void
}

export const favoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData)

export function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<Character[]>([])

  function handleAddCharacterToFavorites(character: Character) {
    setFavorites([...favorites, character])
  }

  useEffect(() => {
    const storagedFavorites = localStorage.getItem('@Rick&MortyApp:favorites')

    if (storagedFavorites) setFavorites(JSON.parse(storagedFavorites))
  }, [])

  useEffect(() => {
    localStorage.setItem(
      '@Rick&MortyApp:favorites', 
      JSON.stringify(favorites))
  }, [favorites])
  
  return (
    <favoritesContext.Provider value={{ favorites, handleAddCharacterToFavorites }}>
      {children}
    </favoritesContext.Provider>
  )
}