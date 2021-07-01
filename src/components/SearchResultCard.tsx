import { useFavorites } from '../hooks/useFavorites'

import { GrStatusGoodSmall } from 'react-icons/gr'
import { AiOutlineStar } from 'react-icons/ai'

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

export function SearchResultCard({ character }: SearchResultCardProps) {
  const { handleAddCharacterToFavorites } = useFavorites()

  return (
    <article className="flex flex-col mobilexl:flex-row gap-4 bg-[#3c3e44] max-w-[34.5rem] rounded-lg shadow overflow-hidden">
      <img 
        className="mobilexl:max-w-[230px]"
        src={character.image} 
        alt={character.name} 
      />
      <div className="flex flex-col gap-4 px-4 pb-4 mobilexl:py-4 mobilexl:pr-4 w-full">
        <h2 className="font-roboto font-bold text-[#FFFFFF] text-2xl">{character.name}</h2>
        <p className="flex items-center gap-1 font-poppins text-[#E89242FF] text-sm">
         <GrStatusGoodSmall 
          size={12} 
          color={
            character.status === 'Alive' 
            ? '#34D399' 
            : character.status === 'Dead' 
            ? '#FB6467FF' 
            : '#917C5DFF'} 
          />
          {character.status} - {character.species}
        </p>
        <p className="flex items-center gap-1 font-poppins text-sm text-[#E89242FF]">Gender - {character.gender}</p>
        <button 
          onClick={() => handleAddCharacterToFavorites(character)}
          className="flex items-center justify-center gap-2 w-full p-3 bg-[#E89242FF] font-roboto font-medium rounded-lg mt-auto"
        >
          <AiOutlineStar size={20} />
          Add to favorites
        </button>
      </div>
    </article>
  )
}