import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navegacion from "./componentes/Navegacion";
import AgregarSuperheroe from "./paginas/AgregarSuperheroe";
import ListaSuperheroes from "./paginas/ListaSuperheroes";

function App() {
  return (
    <Router>
      <Navegacion />
      <Routes>
        <Route path="/" element={<AgregarSuperheroe />} />
        <Route path="/lista" element={<ListaSuperheroes />} />
      </Routes>
    </Router>
  );
}

export default App;
