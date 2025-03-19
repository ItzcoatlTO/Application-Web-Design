import { useState } from "react";
import { TextField, Button, Box, FormHelperText } from "@mui/material";

function FormularioCalificacion({ agregarCalificacion }) {
  const [actividad, setActividad] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar calificación
    if (calificacion === "" || isNaN(calificacion)) {
      setError("Por favor, ingresa una calificación válida.");
      return;
    }
    
    const calificacionNumero = Number(calificacion);
    if (calificacionNumero < 0 || calificacionNumero > 100) {
      setError("La calificación debe estar entre 0 y 100.");
      return;
    }

    // Si todo está bien, limpiar el error y agregar la calificación
    setError("");
    agregarCalificacion({ id: Date.now(), actividad, calificacion: calificacionNumero, fecha });
    setActividad("");
    setCalificacion("");
    setFecha("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField 
        label="Actividad" 
        variant="outlined" 
        fullWidth 
        value={actividad} 
        onChange={(e) => setActividad(e.target.value)} 
        required 
      />
      
      <TextField
        label="Calificación"
        type="number"
        variant="outlined"
        fullWidth
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
        inputProps={{ min: 0, max: 100 }}
        required
      />
      {error && <FormHelperText error>{error}</FormHelperText>}  
      
      <TextField 
        label="Fecha" 
        type="date" 
        InputLabelProps={{ shrink: true }} 
        variant="outlined" 
        fullWidth 
        value={fecha} 
        onChange={(e) => setFecha(e.target.value)} 
        required 
      />
      
      <Button type="submit" variant="contained" color="primary">
        Agregar
      </Button>
    </Box>
  );
}

export default FormularioCalificacion;


