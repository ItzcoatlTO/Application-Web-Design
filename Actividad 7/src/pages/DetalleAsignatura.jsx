import { useParams } from "react-router-dom";
import { useState } from "react";
import FormularioCalificacion from "../components/FormularioCalificacion";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function DetalleAsignatura() {
  const { id } = useParams();
  const [calificaciones, setCalificaciones] = useState([
    { id: 1, actividad: "Tarea 1", calificacion: 92, fecha: "2025-01-20" },
    { id: 2, actividad: "Examen Parcial", calificacion: 81, fecha: "2025-02-10" }
  ]);

  const eliminarCalificacion = (id) => {
    setCalificaciones(calificaciones.filter((calificacion) => calificacion.id !== id));
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Calificaciones
      </Typography>
      <FormularioCalificacion agregarCalificacion={(nuevaCalificacion) => setCalificaciones([...calificaciones, nuevaCalificacion])} />
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Actividad</strong></TableCell>
              <TableCell><strong>Calificación</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell></TableCell> {/* Se deja vacío para alinear el botón */}
            </TableRow>
          </TableHead>
          <TableBody>
            {calificaciones.map((calificacion) => (
              <TableRow key={calificacion.id}>
                <TableCell>{calificacion.actividad}</TableCell>
                <TableCell>{calificacion.calificacion}</TableCell>
                <TableCell>{calificacion.fecha}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => eliminarCalificacion(calificacion.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default DetalleAsignatura;
