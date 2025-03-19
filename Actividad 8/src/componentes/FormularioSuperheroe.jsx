import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

function FormularioSuperheroe({ onSuperheroeAgregado }) {
  const [nombreReal, setNombreReal] = useState("");
  const [nombreHeroe, setNombreHeroe] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);

  const manejarCambioImagen = (e) => setFoto(e.target.files[0]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombreReal || !nombreHeroe || !descripcion || !foto) return alert("Todos los campos son obligatorios");

    const formData = new FormData();
    formData.append("foto", foto);

    try {
      const resImagen = await axios.post("http://localhost:5000/subir-imagen", formData, { headers: { "Content-Type": "multipart/form-data" } });
      const nuevoSuperheroe = { nombreReal, nombreHeroe, foto: resImagen.data.url, descripcion };
      await axios.post("http://localhost:5000/superheroes", nuevoSuperheroe);
      onSuperheroeAgregado(nuevoSuperheroe);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">Agregar Superhéroe</Typography>
      <form onSubmit={manejarEnvio}>
        <TextField label="Nombre Real" fullWidth value={nombreReal} onChange={(e) => setNombreReal(e.target.value)} />
        <TextField label="Nombre de Superhéroe" fullWidth value={nombreHeroe} onChange={(e) => setNombreHeroe(e.target.value)} />
        <TextField label="Descripción" fullWidth multiline rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="file" accept="image/*" onChange={manejarCambioImagen} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
}

export default FormularioSuperheroe;
