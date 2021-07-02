import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { SearchResultCard } from '../components/SearchResultCard'
import { Pagination } from '../components/Pagination'
import ReactLoading from 'react-loading'

import queryString from 'query-string'
import { api } from '../services/api'


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
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  }
  results: Character[];
} 

export function SearchCharacter() {
  const { search } = useLocation()
  const { name } = queryString.parse(search)

  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState<SearchResults>()
  const [currentPage, setCurrentPage] = useState(0)
  const [error, setError] = useState('')

 
  useEffect(() => {
    setLoading(true)
    
    async function fetchData() {
      console.log(currentPage)

      try {
        const response = await api.get(`/character/?page=${currentPage + 1}&name=${name}`)
  
        const { data } = response
  
        setCharacters(data)
      } catch(error) {
        setError(error.message)
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
          Voltar
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
          <h1>{error}</h1>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[50%,50%] gap-4 mt-8">
              {characters?.results.map(result => (
                <SearchResultCard 
                  key={result.id}
                  character={result}
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