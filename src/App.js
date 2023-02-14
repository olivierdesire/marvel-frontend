import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import Character from "./pages/Character";
import ComicsCharacter from "./pages/ComicsCharacter";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [favoris, setFavoris] = useState(false);

  const baseURL = "https://site--marvel-backend--97yqlpf4l44b.code.run";
  // const baseURL = "http://localhost:3001/";

  return (
    <BrowserRouter>
      <Header
        search={search}
        setSearch={setSearch}
        pages={pages}
        setPages={setPages}
        setFavoris={setFavoris}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
