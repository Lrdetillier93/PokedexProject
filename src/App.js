import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PokeList from "./views/PokeList";
import Pokemon from "./views/Pokemon";
import PokedexHome from "./views/PokedexHome";

function App() {
  const [game, setGame] = useState("");

  const handleGame = (selectedGame) => {
    setGame(selectedGame);
  }


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PokedexHome onSubmittedGame={handleGame} />
        </Route>
        <Route exact path="/list">
          <PokeList games={game} />
        </Route>
        <Route exact path="/:id">
          <Pokemon games={game} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
