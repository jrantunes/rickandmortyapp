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
  // Estilos personalizados
  customStyles?: string;  
  children?: ReactNode;
  handleDelete: (characterId: number) => void
}

// Card de favoritos (usado na home) gerado a partir de um personagem passado via parâmetro
// uma função encarregada de remover o personagem dos favoritos passado via parâmetro
// estilos personalizado (opcional) passados via parâmetro
// e um children (opcional) 
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
            // Cor definida a partir do status do personagem 'Alive', 'Dead' ou 'unknown'
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
        // botão de remover o personagem dos favoritos renderizado apenas quando o children é passado
        <button className="text-[0px] ml-auto" onClick={() => handleDelete(character.id)}>
          {children}
        </button>
      )}
    </li>
  )
}