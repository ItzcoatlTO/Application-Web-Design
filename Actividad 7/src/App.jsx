import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import DetalleAsignatura from "./pages/DetalleAsignatura";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/asignatura/:id" element={<DetalleAsignatura />} />
      </Routes>
    </Router>
  );
}

export default App;
