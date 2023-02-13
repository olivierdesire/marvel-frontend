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
  return (
    <BrowserRouter>
      <Header
        search={search}
        setSearch={setSearch}
        pages={pages}
        setPages={setPages}
      />
      <Routes>
        <Route
          path="/"
          element={<Characters search={search} pages={pages} />}
        />
        <Route
          path="/Comics"
          element={<Comics search={search} pages={pages} />}
        />
        <Route path="/Character" element={<Character />} />
        <Route path="/ComicsCharacter" element={<ComicsCharacter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
