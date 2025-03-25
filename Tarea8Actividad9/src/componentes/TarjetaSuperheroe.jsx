import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { API } from "../config"; // 🧠 Usar API base

const TarjetaSuperheroe = ({ heroe, onDesactivar }) => {
  const { nombreReal, nombreHeroe, descripcion, foto, id } = heroe;

  const moverAEliminados = async () => {
    const confirmar = window.confirm(`¿Deseas mover a ${nombreHeroe} a la sección de eliminados?`);
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/superheroes/${id}`);
      onDesactivar(id);
    } catch (error) {
      console.error("❌ Error al desactivar:", error);
      alert("❌ No se pudo mover a eliminados.");
    }
  };

  return (
    <Card sx={{ width: 280, m: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardMedia
        component="img"
        height="240"
        image={foto}
        alt={`Imagen de ${nombreHeroe}`}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>{nombreHeroe}</Typography>
        <Typography variant="body2" color="text.secondary"><strong>{nombreReal}</strong></Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{descripcion}</Typography>
      </CardContent>
      <Button
        onClick={moverAEliminados}
        color="warning"
        variant="contained"
        fullWidth
        sx={{ borderRadius: 0 }}
      >
        Mover a Eliminados
      </Button>
    </Card>
  );
};

export default TarjetaSuperheroe;

