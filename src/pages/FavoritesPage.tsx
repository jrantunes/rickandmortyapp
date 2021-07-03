import { useFavorites } from "../hooks/useFavorites";

import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FiX } from 'react-icons/fi'
import { FavoriteCard } from "../components/FavoriteCard";

import emptyResultsImg from '../assets/images/empty-results.png'

export function FavoritesPage() {
  const { favorites, handleRemoveFromFavorites } = useFavorites()

  return (
    <>
      <header className="bg-[#24325FFF] px-4 py-5 text-[#FFFFFF]">
        {/* Redireciona para a home */}
        <Link to="/" className="flex items-center gap-1 font-roboto font-medium transition-all hover:brightness-90">
          <RiArrowLeftSLine size={20} color="#FFFFFF"/>
          Go back
        </Link>
      </header>
      <main className="max-w-[1120px] w-full flex flex-col px-4 my-8 mx-auto">
        <h1 className="font-poppins font-bold text-3xl text-[#FFFFFF] text-center tabletxl:text-left">Your favorites characters:</h1>
        {favorites.length === 0 ? (
          // exibe um h2 e uma imagem caso a lista de favoritos esteja vazia  
          <div className="mt-5 self-center tabletxl:self-start">
            <h2 className="text-[#FFFFFF] font-poppins font-bold text-xl mb-4 text-center tabletxl:text-left">no characters saved 😟</h2>
            <img 
              className="max-w-xs w-full grayscale block"
              src={emptyResultsImg} 
              alt="Ilustração exibindo Rick e Morty caindo de um portal" 
            />
          </div>
        ) : (
          // Renderiza a lista de favoritos 
          <ul className="w-full flex tabletxl:grid tabletxl:grid-cols-2 flex-col gap-4 mt-8">
            {favorites.map(character => (
              <FavoriteCard 
                key={character.id}
                character={character}
                handleDelete={handleRemoveFromFavorites}
                customStyles="transition-colors mx-auto tabletxl:mx-0 hover:bg-[#222f5a]"
              >
                <FiX size={30} color="#FB6467FF" />
              </FavoriteCard>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}