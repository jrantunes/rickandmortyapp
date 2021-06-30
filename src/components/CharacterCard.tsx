import { BiMaleSign } from 'react-icons/bi'
import { RiArrowRightSLine } from 'react-icons/ri'
import { GiHealthNormal } from 'react-icons/gi'

export function CharacterCard() {
  return (
    <li className="flex items-center gap-4 bg-[#24325FFF] p-3 rounded-lg shadow cursor-pointer hover:bg-[#222f5a] transition-colors mt-4 first:mt-0">
      <img 
        className="w-16 h-16 rounded-full" 
        src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" 
        alt="Rick Sanchez" 
      />
      <div>
        <strong className="font-roboto font-bold text-[#FFFFFF] mb-2">Rick Sanchez</strong>
        <p className="font-poppins text-[#E89242FF] text-xs flex gap-2 items-center">
          Human
          <BiMaleSign size={16} color="#69C8ECFF" />
          Alive
          <GiHealthNormal size={14} color="#34D399" />
          Appeared in
          <span className="text-[#FB6467FF]">999</span>
          episodes
        </p>
      </div>
      <RiArrowRightSLine size={32} color="#FFFFFF" className="ml-auto" />
    </li>
  )
}