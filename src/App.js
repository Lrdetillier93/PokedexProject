import { BrowserRouter, Route, Switch } from "react-router-dom";
import PokeList from "./views/PokeList";
import Pokemon from "./views/Pokemon";
import PokedexHome from "./views/PokedexHome";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PokedexHome />
        </Route>
        <Route exact path="/list">
          <PokeList />
        </Route>
        <Route exact path="/:id">
          <Pokemon />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
