import { ReactNode } from 'react'

import { GrStatusGoodSmall } from 'react-icons/gr'

type Character = {
  id: number;
  image: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  episode: string[];
}

type FavoriteCardProps = {
  character: Character;
  customStyles?: string;  
  children?: ReactNode;
  handleDelete: (characterId: number) => void
}

export function FavoriteCard({ character, customStyles, handleDelete, children }: FavoriteCardProps) {
  return (
    <li className={`flex items-center gap-4 bg-[#24325FFF] p-3 rounded-lg shadow max-w-[33.5rem] tabletxl:max-w-full w-full ${customStyles}`}>
      <img 
        className="w-16 h-16 rounded-full" 
        src={character.image} 
        alt={character.name}
      />
      <div className="flex flex-col gap-1">
        <strong className="font-roboto font-bold text-[#FFFFFF]">{character.name}</strong>
        <div className="flex gap-2 flex-col mobilelg:flex-row">
          <p className="font-poppins text-[#E89242FF] text-xs flex gap-1 items-center">
            <GrStatusGoodSmall size={12} color={
              character.status === 'Alive' 
              ? '#34D399' 
              : character.status === 'Dead' 
              ? '#FB6467FF' 
              : '#917C5DFF'} 
            />
            {character.status} - {character.species}
          </p>
          <p className="font-poppins text-[#E89242FF] text-xs">
            <span className="text-[#FB6467FF] mr-1">{character.episode.length}</span>episode(s)
          </p>
        </div>
      </div>
      {children &&  (
        <button className="text-[0px] ml-auto" onClick={() => handleDelete(character.id)}>
          {children}
        </button>
      )}
    </li>
  )
}