import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../services/api'
import queryString from 'query-string'

import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { ResultCard } from '../components/ResultCard'
import { Pagination } from '../components/Pagination'

import emptyResultsImg from '../assets/images/empty-results.png'

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
  // Pega a query ( ?name=rick ) da url
  const { search } = useLocation()
  // Retira o valor de name da query
  const { name } = queryString.parse(search)

  // Estado do carregamento da requisição (se está carregando ou não) 
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState<SearchResults>()
  const [currentPage, setCurrentPage] = useState(0)
 
  // Toda vez que as variáveis name e currentPage alterar, será feita a requisição  
  useEffect(() => {
    // Atualiza o estado de carregamento para true antes de executar a requisição
    setLoading(true)
    
    async function fetchData() {
      try {
        // Faz a requisição utilizando a página atual que está o usuário e o nome passado na query
        const response = await api.get(`/character/?page=${currentPage + 1}&name=${name}`)
  
        const { data } = response
  
        // Atualiza o valor de characters com os dados retornados pela api
        setCharacters(data)
      } catch(error) {
        console.log(error)
      }

      // Atualiza o estado de carregamento para false
      setLoading(false)
    }

    fetchData()
  }, [name, currentPage])

  return (
    <>
      <header className="bg-[#24325FFF] px-4 py-5 text-[#FFFFFF]">
        {/* Redireciona para a home */}
        <Link to="/" className="flex items-center gap-1 font-roboto font-medium transition-all hover:brightness-90">
          <RiArrowLeftSLine size={20} color="#FFFFFF"/>
          Go back
        </Link>
      </header>
      <main className="max-w-[1120px] flex flex-col items-center lg:items-start px-4 my-8 mx-auto">
        <h1 className="font-poppins font-bold text-3xl text-[#FFFFFF]">Results for {name}:</h1>
        
        {loading ? (
          // Renderiza um componente de loading caso o estado de carregamento seja true
          <div className="w-full flex items-center justify-center mt-16">
            <ReactLoading 
              type="spinningBubbles"
              color="#FFFFFF"
            />
          </div>
        ) : !characters ? (
          // Exibe um h2 e uma imagem caso characters seja undefined (personagem não encontrado ou erro no retorno da api)
          <div className="self-center tabletxl:self-start mt-5">
            <h2 className="font-poppins font-bold text-xl text-[#FFFFFF] text-center tabletxl:text-left mb-4">no results for {name} 😟</h2>
            <img 
              className="max-w-xs w-full grayscale block"
              src={emptyResultsImg} 
              alt="Ilustração exibindo Rick e Morty caindo de um portal" 
            />
          </div>
        ) : (
          // Exibe cards com os resultados da api e abaixo o componente de paginação 
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