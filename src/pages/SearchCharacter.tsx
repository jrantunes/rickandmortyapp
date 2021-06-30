import { useParams } from 'react-router-dom'

type SearchParams = {
  name: string;
}

export function SearchCharacter() {
  const { name } = useParams<SearchParams>()
 
  return <h1>{name}</h1>
}