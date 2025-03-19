import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Navegacion() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Agregar Superhéroe</Button>
          <Button color="inherit" component={Link} to="/lista">Lista de Superhéroes</Button>
        </Toolbar>
      </AppBar>
      {/* Agregar margen superior para evitar que la barra de navegación tape el contenido */}
      <Container style={{ marginTop: "80px" }} />
    </>
  );
}

export default Navegacion;
