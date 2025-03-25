import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Alert,
} from "@mui/material";
import { API } from "../config";

function SuperheroesEliminados() {
  const [eliminados, setEliminados] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarEliminados();
  }, []);

  const cargarEliminados = async () => {
    try {
      const res = await axios.get(`${API}/superheroes/eliminados`);
      setEliminados(res.data);
    } catch (err) {
      console.error("❌ Error al obtener eliminados:", err);
      setError("No se pudo cargar la lista de superhéroes eliminados.");
    }
  };

  const restaurar = async (id) => {
    try {
      await axios.patch(`${API}/superheroes/restaurar/${id}`);
      setEliminados((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("❌ Error al restaurar:", err);
      alert("⚠️ No se pudo restaurar el superhéroe.");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Superhéroes Eliminados 🗑️
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3} justifyContent="center">
        {eliminados.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 3 }}>
            No hay superhéroes eliminados.
          </Typography>
        ) : (
          eliminados.map((hero) => (
            <Grid item key={hero.id}>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={hero.foto}
                  alt={hero.nombreHeroe}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {hero.nombreHeroe}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    ({hero.nombreReal})
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    onClick={() => restaurar(hero.id)}
                    variant="contained"
                    color="success"
                  >
                    Restaurar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default SuperheroesEliminados;

