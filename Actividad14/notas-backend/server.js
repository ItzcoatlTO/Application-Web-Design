const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Permitir solicitudes desde diferentes orígenes
app.use(express.json()); // Permitir el manejo de datos JSON

// Simular una base de datos en memoria
let notas = [];

// Ruta POST para crear una nota
app.post('/api/notas', (req, res) => {
  const { titulo, autor, cuerpo, clasificacion } = req.body;

  // Verificar que todos los campos están presentes en la solicitud
  if (!titulo || !autor || !cuerpo || !clasificacion) {
    return res.status(400).json({ message: "Faltan datos en la solicitud" });
  }

  // Obtener la fecha y hora actual
  const fechaHora = new Date().toISOString();  // Formato ISO 8601

  // Crear una nueva nota
  const nuevaNota = {
    id: Date.now(), // Usamos la fecha actual como ID único
    titulo,
    autor,
    cuerpo,
    clasificacion,
    fechaHora, // Fecha y hora actual
  };

  // Almacenar la nueva nota
  notas.push(nuevaNota);

  // Responder con la nueva nota
  res.status(201).json(nuevaNota);
});

// Ruta GET para obtener todas las notas
app.get('/api/notas', (req, res) => {
  res.json(notas);
});

// Ruta PUT para editar una nota
app.put('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, cuerpo, clasificacion } = req.body;

  // Buscar la nota por ID y actualizarla
  let nota = notas.find(n => n.id === parseInt(id));
  if (!nota) {
    return res.status(404).json({ message: 'Nota no encontrada' });
  }

  nota.titulo = titulo;
  nota.autor = autor;
  nota.cuerpo = cuerpo;
  nota.clasificacion = clasificacion;

  res.json(nota);
});

// Ruta DELETE para eliminar una nota
app.delete('/api/notas/:id', (req, res) => {
  const { id } = req.params;

  // Eliminar la nota por ID
  notas = notas.filter(n => n.id !== parseInt(id));

  res.status(204).send(); // Respuesta de éxito sin contenido
});

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
