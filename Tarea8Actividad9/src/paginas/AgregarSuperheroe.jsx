import { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from "axios";
import { API } from "../config";

function AgregarSuperheroe() {
  const [nombreReal, setNombreReal] = useState("");
  const [nombreHeroe, setNombreHeroe] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!nombreReal || !nombreHeroe || !descripcion || !foto) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // 📤 1. Subir imagen al servidor
      const formData = new FormData();
      formData.append("foto", foto);

      const respuestaImagen = await axios.post(`${API}/subir-imagen`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 📦 2. Crear superhéroe con la URL de la imagen
      const nuevoHeroe = {
        nombreReal,
        nombreHeroe,
        descripcion,
        foto: respuestaImagen.data.url,
      };

      await axios.post(`${API}/superheroes`, nuevoHeroe);

      // ✅ 3. Limpiar campos
      setNombreReal("");
      setNombreHeroe("");
      setDescripcion("");
      setFoto(null);
      setExito("Superhéroe agregado con éxito.");

    } catch (err) {
      console.error("❌ Error al agregar superhéroe:", err);
      setError("No se pudo agregar el superhéroe.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Agregar Superhéroe
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {exito && <Alert severity="success" sx={{ mb: 2 }}>{exito}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre Real"
          fullWidth
          value={nombreReal}
          onChange={(e) => setNombreReal(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Nombre del Superhéroe"
          fullWidth
          value={nombreHeroe}
          onChange={(e) => setNombreHeroe(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Descripción"
          fullWidth
          multiline
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          margin="normal"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files[0])}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Container>
  );
}

export default AgregarSuperheroe;
