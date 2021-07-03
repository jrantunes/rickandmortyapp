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

  // Salvar um personagem passado via parâmetro na lista de favoritos
  function handleAddCharacterToFavorites(character: Character) {
    // Verifica se o personagem já existe na lista de favoritos
    const findCharacter = favorites.some(char => char.id === character.id)

    if (findCharacter) {
      alert('character already added')
      return
    }

    // Salva o personagem caso ele ainda não esteja na lista
    setFavorites([...favorites, character])
  }

  // Remover um personagem baseado em seu id
  function handleRemoveFromFavorites(charId: number) {
    // Confirma se o usuário deseja mesmo remover um personagem dos favoritos
    if (!window.confirm('Are you sure you want to remove this character from favorites?')) return
    
    // Cria um novo array com os personagens que o id seja diferente do id passado como parâmetro
    const newFavoritesArray = favorites.filter(character => character.id !== charId)

    // Atualiza a lista de favoritos com esse novo array
    setFavorites([...newFavoritesArray])
  }

  useEffect(() => {
    // Recupera os favoritos salvos no localStorage assim que o componente é renderizado
    // e atualiza o estado com eles caso existam
    const storagedFavorites = localStorage.getItem('@Rick&MortyApp:favorites')

    if (storagedFavorites) setFavorites(JSON.parse(storagedFavorites))
  }, [])

  useEffect(() => {
    // Salva os favoritos em localStorage toda vez em que o estado de favorites seja atualizado
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