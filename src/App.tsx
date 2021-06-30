import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { SearchCharacter } from './pages/SearchCharacter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search/:name" exact component={SearchCharacter} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
