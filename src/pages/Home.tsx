import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { FavoriteCard } from '../components/FavoriteCard'

import illustrationImg from '../assets/images/illustration.png'
import emptyResultsImg from '../assets/images/empty-results.png'

export function Home() {
  const [characterName, setCharacterName] = useState('')
  const { favorites, handleRemoveFromFavorites } = useFavorites()
  const history = useHistory()

  function handleRedirectToSearchPage(event: FormEvent) {
    // cancela o evento do form (não recarrega a página)
    event.preventDefault()

    // Verifica se o input está vazio
    if (characterName.trim() === '') return

    // Redireciona para a página de pesquisa enviando o nome do personagem via query string
    history.push(
      `/search/?name=${characterName.trim().replace(/\s\s+/g, '+')}`
    )
  }

  return (
    <div className="flex gap-10 h-screen px-8 py-11 relative">
      <aside className="flex-[7] flex flex-col items-center lg:items-start justify-center text-white">
        <img src={illustrationImg} className="max-w-xs w-full block" alt="Ilustração exibindo Rick e Morty saindo de um portal" />
        <div className="text-center lg:text-left">
          <h1 className="max-w-[25rem] lg:max-w-[32rem] mt-5 font-poppins font-bold text-3xl sm:text-4xl text-white">Search for your favorite characters and save them if you want</h1>
          <p className="font-roboto font-medium text-sm text-[#FAE48BFF] mt-4">Type his name on the input bellow.</p>
        </div>
        <form onSubmit={handleRedirectToSearchPage} className="max-w-sm w-full mt-6">
          <div className="flex">
            <input 
              className="h-[3.25rem] flex-1 p-4 rounded-tl-lg rounded-bl-lg text-[#292929] focus:border-[1px] focus:border-r-0 focus:border-solid focus:border-[#24325FFF]"
              placeholder="Character's name"
              type="text" 
              onChange={event => setCharacterName(event.target.value)}
              value={characterName}
            />
            <button 
              className="p-4 rounded-tr-lg rounded-br-lg bg-[#24325FFF] text-[0px] transition-colors hover:bg-[#222f5a]"
              type="submit"
            >
              <AiOutlineArrowRight size={20} color="#FFFFFF" />
            </button>
          </div>
        </form>
      </aside>
      <main className="flex-[8] lg:flex lg:flex-col lg:justify-center lg:items-center hidden">
        <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-8">Latest favorites</h2>
        <div className="w-full self-start flex flex-col items-center"> 
          {favorites.length === 0 ? (
            // Exibe um h2 e uma imagem caso a lista de favoritos esteja vazia
            <>
              <h2 className="font-poppins font-bold text-xl text-[#FFFFFF] mb-4">no characters saved 😟</h2>
              <img 
                className="max-w-xs w-full grayscale block"
                src={emptyResultsImg} 
                alt="Ilustração exibindo Rick e Morty caindo de um portal" 
              />
            </>
          ) : (
            // Renderiza os 3 primeiro itens da lista de favoritos invertida 
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
              {/* Redireciona para a página de favoritos */}
              <Link to="/favorites" className="mt-8 font-roboto font-medium text-[#E89242FF] text-sm underline transition-all hover:brightness-90">Access full list</Link>
            </>
          )}
        </div>
      </main>
      {/* Redireciona para a página de favoritos (visível apenas para dispositivos mobile) */}
      <Link to="/favorites" className="absolute right-3 top-3 p-4 bg-[#E89242FF] text-[0px] rounded-full lg:hidden">
        <AiFillHeart size={20} color="#FFFFFF" />
      </Link>
    </div>
  )
}