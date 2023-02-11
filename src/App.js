import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
