import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../services/api'
import queryString from 'query-string'

import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { ResultCard } from '../components/ResultCard'
import { Pagination } from '../components/Pagination'

import emptyFavorites from '../assets/images/empty-favorites.png'

type Character = {
  id: number;
  name: string;
  image: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  episode: string[];
}

type SearchResults = {
  info: {
    pages: number;
  }
  results: Character[];
} 

export function SearchPage() {
  const { search } = useLocation()
  const { name } = queryString.parse(search)

  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState<SearchResults>()
  const [currentPage, setCurrentPage] = useState(0)
 
  useEffect(() => {
    setLoading(true)
    
    async function fetchData() {
      console.log(currentPage)

      try {
        const response = await api.get(`/character/?page=${currentPage + 1}&name=${name}`)
  
        const { data } = response
  
        setCharacters(data)
      } catch(error) {
        console.log(error)
      }

      setLoading(false)
    }

    fetchData()
  }, [name, currentPage])

  return (
    <>
      <header className="bg-[#24325FFF] px-4 py-5 text-[#FFFFFF]">
        <Link to="/" className="flex items-center gap-1 font-roboto font-medium hover:brightness-90 transition-all">
          <RiArrowLeftSLine size={20} color="#FFFFFF"/>
          Go back
        </Link>
      </header>
      <main className="flex flex-col items-center px-4 lg:items-start max-w-[1120px] my-8 mx-auto">
        <h1 className="text-[#FFFFFF] font-poppins font-bold text-3xl">Results for {name}:</h1>
        
        {loading ? (
          <div className="w-full flex justify-center items-center mt-16">
            <ReactLoading 
              type="spinningBubbles"
              color="#FFFFFF"
            />
          </div>
        ) : !characters ? (
          <div className="mt-5 self-center tabletxl:self-start">
            <h2 className="text-[#FFFFFF] font-poppins font-bold text-xl mb-4 text-center tabletxl:text-left">no results for {name} :(</h2>
            <img 
              className="max-w-xs w-full grayscale block"
              src={emptyFavorites} 
              alt="top" 
            />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center mt-8">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[50%,50%] gap-4 lg:mr-4">
              {characters.results.map(character => (
                <ResultCard 
                  key={character.id}
                  character={character}
                />
              ))}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={characters.info.pages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </main>
    </>
  )
}