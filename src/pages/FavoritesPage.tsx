import { useFavorites } from "../hooks/useFavorites";

import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FiX } from 'react-icons/fi'
import { FavoriteCard } from "../components/FavoriteCard";


export function FavoritesPage() {
  const { favorites, handleRemoveFromFavorites } = useFavorites()

  return (
    <>
      <header className="bg-[#24325FFF] px-4 py-5 text-[#FFFFFF]">
        <Link to="/" className="flex items-center gap-1 font-roboto font-medium hover:brightness-90 transition-all">
          <RiArrowLeftSLine size={20} color="#FFFFFF"/>
          Go back
        </Link>
      </header>
      <main className="max-w-[1120px] w-full px-4 my-8 mx-auto">
        <h1 className="text-[#FFFFFF] font-poppins font-bold text-3xl text-center tabletxl:text-left">Your favorites characters:</h1>
        <ul className="w-full flex flex-col tabletxl:grid tabletxl:grid-cols-2 gap-4 mt-8">
          {favorites.map(character => (
            <FavoriteCard 
              key={character.id}
              character={character}
              handleDelete={handleRemoveFromFavorites}
              customStyles="hover:bg-[#222f5a] transition-colors tabletxl:mx-0 mx-auto"
            >
              <FiX size={30} color="#FB6467FF" />
            </FavoriteCard>
          ))}
        </ul>
      </main>
    </>
  )
}