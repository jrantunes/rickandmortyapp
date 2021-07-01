import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'

import { RiArrowLeftSLine } from 'react-icons/ri'
import { SearchResultCard } from '../components/SearchResultCard'

type SearchParams = {
  name: string;
}

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
  const [results, setResults] = useState<SearchResults>()
  const { name } = useParams<SearchParams>()
 
  console.log(results)

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/character/?name=${name}`)

      const { data } = response

      setResults(data)
    }

    fetchData()
  }, [name])

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-4 mt-8">
          {results?.results.map(result => (
            <SearchResultCard 
              key={result.id}
              character={result}
            />
          ))}
        </div>
      </main>
    </>
  )
}