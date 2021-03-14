import {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import { Token } from './Token'
import Details from './pages/Details';

function App() {
  const [token, setToken] = useState()

  return (
    <Router>
      <Token.Provider value={{token, setToken}}>
        <div className="app">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route exact path="/:name" >
              <SearchResults />
            </Route>
            <Route exact path="/:name/:id" >
              <Details/>
            </Route>
          </Switch>
        </div>
      </Token.Provider>
    </Router>
  );
}

export default App;
