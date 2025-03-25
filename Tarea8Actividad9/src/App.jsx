import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import ListaSuperheroes from "./paginas/ListaSuperheroes";
import AgregarSuperheroe from "./paginas/AgregarSuperheroe";
import SuperheroesEliminados from "./paginas/SuperheroesEliminados";

function App() {
  return (
    <Router>
      {/* 🧭 Navegación superior */}
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Lista de Superhéroes
          </Button>
          <Button color="inherit" component={Link} to="/agregar">
            Agregar Superhéroe
          </Button>
          <Button color="inherit" component={Link} to="/eliminados">
            Restaurar Superhéroes
          </Button>
        </Toolbar>
      </AppBar>

      {/* 🔁 Enrutamiento de vistas */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ListaSuperheroes />} />
          <Route path="/agregar" element={<AgregarSuperheroe />} />
          <Route path="/eliminados" element={<SuperheroesEliminados />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

