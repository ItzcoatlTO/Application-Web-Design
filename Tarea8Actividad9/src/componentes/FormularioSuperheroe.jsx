import { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from "axios";
import { API } from "../config";

function FormularioSuperheroe({ onSuperheroeAgregado }) {
  const [nombreReal, setNombreReal] = useState("");
  const [nombreHeroe, setNombreHeroe] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!nombreReal || !nombreHeroe || !descripcion || !foto) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("foto", foto);

      const resImagen = await axios.post(`${API}/subir-imagen`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const nuevoSuperheroe = {
        nombreReal,
        nombreHeroe,
        foto: resImagen.data.url,
        descripcion,
      };

      await axios.post(`${API}/superheroes`, nuevoSuperheroe);
      setExito("Superhéroe agregado con éxito.");
      onSuperheroeAgregado && onSuperheroeAgregado(nuevoSuperheroe);

      setNombreReal("");
      setNombreHeroe("");
      setDescripcion("");
      setFoto(null);
    } catch (error) {
      console.error("Error al subir el héroe:", error);
      setError("No se pudo agregar el superhéroe.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">Agregar Superhéroe</Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {exito && <Alert severity="success">{exito}</Alert>}

      <form onSubmit={manejarEnvio}>
        <TextField label="Nombre Real" fullWidth value={nombreReal} onChange={(e) => setNombreReal(e.target.value)} />
        <TextField label="Nombre de Superhéroe" fullWidth value={nombreHeroe} onChange={(e) => setNombreHeroe(e.target.value)} />
        <TextField label="Descripción" fullWidth multiline rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} style={{ margin: "15px 0" }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
}

export default FormularioSuperheroe;
