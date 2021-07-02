import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { SearchPage } from './pages/SearchPage';
import { FavoritesContextProvider } from './contexts/FavoritesContext'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <FavoritesContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={SearchPage} />
        </FavoritesContextProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
