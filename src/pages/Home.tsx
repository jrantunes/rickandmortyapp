import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { FavoriteCard } from '../components/FavoriteCard'

import illustrationImg from '../assets/images/illustration.png'
import emptyFavorites from '../assets/images/empty-favorites.png'

export function Home() {
  const [characterName, setCharacterName] = useState('')
  const { favorites, handleRemoveFromFavorites } = useFavorites()
  const history = useHistory()

  function handleRedirectToSearchPage(event: FormEvent) {
    event.preventDefault()

    if (characterName.trim() === '') return

    history.push(
      `/search/?name=${characterName.trim().replace(/\s\s+/g, '+')}`
    )
  }

  return (
    <div className="flex gap-10 h-screen px-8 py-11 relative">
      <aside className="flex-[7] flex flex-col justify-center items-center text-white lg:items-start">
        <img src={illustrationImg} className="max-w-xs w-full block" alt="Ilustração exibindo Rick e Morty saindo de um portal" />
        <div className="text-center lg:text-left">
          <h2 className="lg:max-w-[35rem] max-w-[25rem] mt-5 font-poppins font-bold text-3xl sm:text-4xl text-white">Any doubt about some character of the series?</h2>
          <p className="font-roboto font-medium text-sm text-[#FAE48BFF] mt-4">Type his name on the input bellow.</p>
        </div>
        <form onSubmit={handleRedirectToSearchPage} className="mt-6 max-w-sm w-full">
          <div className="flex">
            <input 
              className="h-[3.25rem] flex-1 p-4 rounded-tl-lg rounded-bl-lg text-[#292929] focus:border-[1px] focus:border-r-0 focus:border-solid focus:border-[#24325FFF]"
              placeholder="Character's name"
              type="text" 
              onChange={event => setCharacterName(event.target.value)}
              value={characterName}
            />
            <button 
              className="p-4 rounded-tr-lg rounded-br-lg text-[0px] bg-[#24325FFF] hover:bg-[#222f5a] transition-colors"
              type="submit"
            >
              <AiOutlineArrowRight size={20} color="#FFFFFF" />
            </button>
          </div>
        </form>
      </aside>
      <main className="flex-[8] lg:flex lg:flex-col lg:justify-center lg:items-center hidden">
        <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-8">Latest favorites</h2>
        <div className="self-start w-full flex flex-col items-center"> 
          {favorites.length === 0 ? (
            <>
              <h2 className="text-[#FFFFFF] font-poppins font-bold text-xl mb-4">no characters saved :(</h2>
              <img 
                className="max-w-xs w-full grayscale block"
                src={emptyFavorites} 
                alt="top" 
              />
            </>
          ) : (
            <>
              <ul className="w-full">
                {[...favorites].reverse().splice(0, 3).map(character => (
                  <FavoriteCard 
                    key={character.id}
                    customStyles="mt-4 first:mt-0"
                    character={character}
                    handleDelete={handleRemoveFromFavorites}
                  />
                ))}
              </ul>
              <Link to="/favorites" className="mt-8 text-[#E89242FF] font-roboto font-medium underline text-sm hover:brightness-90 transition-all">Access full list</Link>
            </>
          )}
        </div>
      </main>
      <Link to="/favorites" className="absolute right-3 top-3 p-4 bg-[#E89242FF] text-[0px] rounded-full lg:hidden">
        <AiFillHeart size={20} color="#FFFFFF" />
      </Link>
    </div>
  )
}