import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import Character from "./pages/Character";
import ComicsCharacter from "./pages/ComicsCharacter";
import Favoris from "./pages/Favoris";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [origin, setOrigin] = useState("Characters");

  const baseURL = "https://site--marvel-backend--97yqlpf4l44b.code.run";
  // const baseURL = "http://localhost:3001/";

  // Récupération des Cookies
  const recupFavoris = () => {
    const objectCookies = Cookies.get();
    return Object.values(objectCookies);
  };

  const favoris = recupFavoris();

  return (
    <BrowserRouter>
      <Header
        search={search}
        setSearch={setSearch}
        pages={pages}
        setPages={setPages}
        origin={origin}
        setOrigin={setOrigin}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              baseURL={baseURL}
              search={search}
              pages={pages}
              favoris={favoris}
            />
          }
        />
        <Route
          path="/Comics"
          element={<Comics baseURL={baseURL} search={search} pages={pages} />}
        />
        <Route path="/Character" element={<Character baseURL={baseURL} />} />
        <Route
          path="/ComicsCharacter"
          element={<ComicsCharacter baseURL={baseURL} />}
        />
        <Route path="/Favoris" element={<Favoris baseURL={baseURL} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
