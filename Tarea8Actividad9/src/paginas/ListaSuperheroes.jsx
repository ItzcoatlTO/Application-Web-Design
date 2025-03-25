import { useEffect, useState } from "react";
import axios from "axios";
import TarjetaSuperheroe from "../componentes/TarjetaSuperheroe";
import { Typography, Grid, Container, Alert } from "@mui/material";

const ListaSuperheroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState("");

  // 🔄 Obtener héroes activos
  const obtenerHeroes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/superheroes");
      setHeroes(res.data);
    } catch (err) {
      console.error("❌ Error al cargar héroes:", err);
      setError("Error al cargar la lista de superhéroes.");
    }
  };

  // 🧼 Borrado lógico → actualizar lista local
  const moverAEliminados = (id) => {
    setHeroes(heroes.filter((hero) => hero.id !== id));
  };

  useEffect(() => {
    obtenerHeroes();
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Lista de Superhéroes
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2} justifyContent="center">
        {heroes.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 3 }}>
            No hay superhéroes activos.
          </Typography>
        ) : (
          heroes.map((hero) => (
            <Grid item key={hero.id}>
              <TarjetaSuperheroe heroe={hero} onDesactivar={moverAEliminados} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ListaSuperheroes;


