import { useFavorites } from '../hooks/useFavorites'

import { GrStatusGoodSmall } from 'react-icons/gr'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

type Character = {
  id: number;
  image: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  episode: string[];
}

type SearchResultCardProps = {
  character: Character
}

// Card de resultados (usado na página de search) gerado a partir de um personagem passado via parâmetro
export function ResultCard({ character }: SearchResultCardProps) {
  const { 
    handleAddCharacterToFavorites, 
    handleRemoveFromFavorites, 
    favorites 
  } = useFavorites()

  return (
    <article className="max-w-[34rem] w-full flex flex-col mobilexl:flex-row gap-2 bg-[#3c3e44] rounded-lg shadow overflow-hidden mx-auto">
      <img 
        className="mobilexl:max-w-[230px]"
        src={character.image} 
        alt={character.name} 
      />
      <div className="w-full flex flex-col gap-4 px-4 pb-4 mobilexl:py-4 mobilexl:pr-4">
        <h2 className="font-roboto font-bold text-2xl text-[#FFFFFF]">{character.name}</h2>
        <p className="flex items-center gap-1 font-poppins text-sm text-[#E89242FF]">
         <GrStatusGoodSmall 
          size={12} 
          color={
            // Cor definida a partir do status do personagem 'Alive', 'Dead' ou 'unknown'
            character.status === 'Alive' 
            ? '#34D399' 
            : character.status === 'Dead' 
            ? '#FB6467FF' 
            : '#917C5DFF'} 
          />
          {character.status} - {character.species}
        </p>
        <p className="flex items-center gap-1 font-poppins text-sm text-[#E89242FF]">Gender - {character.gender}</p>
        {!favorites.some(char => char.id === character.id) ? (
          // Botão exibido caso o personagem não esteja na lista de favoritos
          <button 
            onClick={() => handleAddCharacterToFavorites(character)}
            className="w-full flex items-center justify-center gap-2 p-3 bg-[#E89242FF] font-roboto font-medium text-[#FFFFFF] transition-colors hover:bg-[#E8924299] rounded-lg mt-auto"
          >
            <AiOutlineHeart size={20} />
            Add to favorites
          </button>
        ) : (
          // Botão exibido caso o personagem já esteja na lista de favoritos
          <button 
            onClick={() => handleRemoveFromFavorites(character.id)}
            className="flex items-center justify-center gap-2 w-full p-3 bg-[#FB6467FF] font-roboto font-medium text-[#FFFFFF] transition-colors hover:bg-[#FB646799] rounded-lg mt-auto"
          >
            <AiFillHeart size={20} />
            Remove from favorites
          </button>
        )}
      </div>
    </article>
  )
}