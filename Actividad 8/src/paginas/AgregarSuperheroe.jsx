import { Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AgregarSuperheroe() {
  const [nombreReal, setNombreReal] = useState("");
  const [nombreHeroe, setNombreHeroe] = useState("");
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foto) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("foto", foto);

    const respuesta = await axios.post("http://localhost:5000/subir-imagen", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const nuevaImagenURL = respuesta.data.url;

    await axios.post("http://localhost:5000/superheroes", {
      nombreReal,
      nombreHeroe,
      foto: nuevaImagenURL,
      descripcion,
    });

    setNombreReal("");
    setNombreHeroe("");
    setFoto(null);
    setDescripcion("");
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Agregar Superhéroe
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Nombre Real" value={nombreReal} onChange={(e) => setNombreReal(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Nombre del Superhéroe" value={nombreHeroe} onChange={(e) => setNombreHeroe(e.target.value)} margin="normal" required />
        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} required />
        <TextField fullWidth label="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} margin="normal" required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Container>
  );
}

export default AgregarSuperheroe;
