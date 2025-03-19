import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Stack } from "@mui/material";

function Inicio() {
  const [materias] = useState([
    { id: 1, nombre: "Diseño de Aplicaciones Web" },
    { id: 2, nombre: "Verificación y Validación del Software" },
    { id: 3, nombre: "Proyecto Ingeniería de Software" }
  ]);

  return (
    <Container className="container">
      <Typography variant="h3" gutterBottom>
        Materias
      </Typography>
      <Stack spacing={2}>
        {materias.map((materia) => (
          <Link key={materia.id} to={`/asignatura/${materia.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth sx={{ fontSize: '18px', padding: '12px' }}>
              {materia.nombre}
            </Button>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}

export default Inicio;

