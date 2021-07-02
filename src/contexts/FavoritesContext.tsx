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
  handleAddCharacterToFavorites: (character: Character) => void;
  handleRemoveFromFavorites: (characterId: number) => void;
}

export const favoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData)

export function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<Character[]>([])

  function handleAddCharacterToFavorites(character: Character) {
    const findCharacter = favorites.some(char => char.id === character.id)

    if (findCharacter) {
      alert('character already added')
      return
    }

    setFavorites([...favorites, character])
  }

  function handleRemoveFromFavorites(charId: number) {
    if (!window.confirm('Are you sure you want to remove this character from favorites?')) return
    
    const newFavoritesArray = favorites.filter(character => character.id !== charId)

    setFavorites([...newFavoritesArray])
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
    <favoritesContext.Provider value={{ favorites, handleAddCharacterToFavorites, handleRemoveFromFavorites }}>
      {children}
    </favoritesContext.Provider>
  )
}