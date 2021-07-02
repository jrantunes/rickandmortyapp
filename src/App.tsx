import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { FavoritesContextProvider } from './contexts/FavoritesContext'

import { Home } from './pages/Home'
import { SearchPage } from './pages/SearchPage';
import { FavoritesPage } from './pages/FavoritesPage';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <FavoritesContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={SearchPage} />
          <Route path="/favorites" component={FavoritesPage} />
        </FavoritesContextProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
