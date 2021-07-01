import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { SearchCharacter } from './pages/SearchCharacter';
import { FavoritesContextProvider } from './contexts/FavoritesContext'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <FavoritesContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/search/:name" exact component={SearchCharacter} />
        </FavoritesContextProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
