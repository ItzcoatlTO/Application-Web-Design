import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navegacion() {
  return (
    <AppBar position="static" color="primary">
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
  );
}

export default Navegacion;
