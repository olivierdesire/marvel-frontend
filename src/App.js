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
  // const baseURL = "http://localhost:3001";

  const parseCookie = () => {
    let newArray = [];
    if (Cookies.get("Favoris")) {
      newArray = JSON.parse(Cookies.get("Favoris"));
    }
    return newArray;
  };

  const updateCookie = (array) => {
    let str = "";
    Cookies.remove("Favoris");
    str = JSON.stringify(array);
    Cookies.set("Favoris", str);
  };

  const [favoris, setFavoris] = useState(parseCookie());

  return (
    <BrowserRouter>
      <Header
        search={search}
        setSearch={setSearch}
        pages={pages}
        setPages={setPages}
        origin={origin}
        setOrigin={setOrigin}
        favoris={favoris}
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
              setFavoris={setFavoris}
              updateCookie={updateCookie}
            />
          }
        />
        <Route
          path="/Comics"
          element={
            <Comics
              baseURL={baseURL}
              search={search}
              pages={pages}
              favoris={favoris}
              setFavoris={setFavoris}
              updateCookie={updateCookie}
            />
          }
        />
        <Route
          path="/Character"
          element={
            <Character
              baseURL={baseURL}
              favoris={favoris}
              setFavoris={setFavoris}
              updateCookie={updateCookie}
            />
          }
        />
        <Route
          path="/ComicsCharacter"
          element={
            <ComicsCharacter
              baseURL={baseURL}
              favoris={favoris}
              setFavoris={setFavoris}
              updateCookie={updateCookie}
            />
          }
        />
        <Route
          path="/Favoris"
          element={
            <Favoris
              baseURL={baseURL}
              favoris={favoris}
              setFavoris={setFavoris}
              updateCookie={updateCookie}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
