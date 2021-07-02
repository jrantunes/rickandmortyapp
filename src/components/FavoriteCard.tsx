import { RiArrowRightSLine } from 'react-icons/ri'
import { GrStatusGoodSmall } from 'react-icons/gr'

type Character = {
  id: number;
  image: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  episode: string[];
}

type FavoriteCharactersCardProps = {
  character: Character;
  handleDelete: (characterId: number) => void
}

export function FavoriteCard({ character, handleDelete }: FavoriteCharactersCardProps) {
  return (
    <li className="flex items-center gap-4 bg-[#24325FFF] p-3 rounded-lg shadow cursor-pointer hover:bg-[#222f5a] transition-colors mt-4 first:mt-0">
      <img 
        className="w-16 h-16 rounded-full" 
        src={character.image} 
        alt={character.name}
      />
      <div className="flex flex-col gap-1">
        <strong className="font-roboto font-bold text-[#FFFFFF]">{character.name}</strong>
        <p className="font-poppins text-[#E89242FF] text-xs flex gap-1 items-center">
          <GrStatusGoodSmall size={12} color={
            character.status === 'Alive' 
            ? '#34D399' 
            : character.status === 'Dead' 
            ? '#FB6467FF' 
            : '#917C5DFF'} 
          />
          {character.status} - {character.species} - Appeared in
          <span className="text-[#FB6467FF]">{character.episode.length}</span>
          episodes
        </p>
      </div>
      <button className="text-[0px] ml-auto" onClick={() => handleDelete(character.id)}>
        <RiArrowRightSLine size={32} color="#FFFFFF" />
      </button>
    </li>
  )
}