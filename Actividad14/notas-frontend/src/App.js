import React, { useState, useEffect } from 'react';

function App() {
  const [notas, setNotas] = useState([]);
  const [nota, setNota] = useState({ titulo: '', autor: '', cuerpo: '', clasificacion: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Cargar notas desde localStorage
  useEffect(() => {
    const storedNotas = JSON.parse(localStorage.getItem('notas')) || [];
    setNotas(storedNotas);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNota({ ...nota, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedNotas = notas.map((n) =>
        n.id === editId ? { ...n, ...nota } : n
      );
      setNotas(updatedNotas);
      localStorage.setItem('notas', JSON.stringify(updatedNotas));
      resetForm();
    } else {
      const newNota = { ...nota, id: Date.now() };
      const updatedNotas = [...notas, newNota];
      setNotas(updatedNotas);
      localStorage.setItem('notas', JSON.stringify(updatedNotas));
      resetForm();
    }
  };

  const handleEdit = (id) => {
    const notaToEdit = notas.find((n) => n.id === id);
    setNota({ ...notaToEdit });
    setEditId(id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updatedNotas = notas.filter((n) => n.id !== id);
    setNotas(updatedNotas);
    localStorage.setItem('notas', JSON.stringify(updatedNotas));
  };

  const resetForm = () => {
    setNota({ titulo: '', autor: '', cuerpo: '', clasificacion: '' });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="App">
      <h1>Notas Personales</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          value={nota.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          type="text"
          name="autor"
          value={nota.autor}
          onChange={handleChange}
          placeholder="Autor"
          required
        />
        <textarea
          name="cuerpo"
          value={nota.cuerpo}
          onChange={handleChange}
          placeholder="Cuerpo de la nota"
          required
        />
        <select name="clasificacion" value={nota.clasificacion} onChange={handleChange}>
          <option value="personal">Personal</option>
          <option value="laboral">Laboral</option>
          <option value="escolar">Escolar</option>
        </select>
        <button type="submit">{isEditing ? 'Editar Nota' : 'Crear Nota'}</button>
      </form>

      <ul>
        {notas.map((nota) => (
          <li key={nota.id}>
            <h3>{nota.titulo}</h3>
            <p>{nota.cuerpo}</p>
            <p>
              <strong>{nota.autor}</strong> - {new Date(nota.fecha).toLocaleString()}
            </p>
            <p>{nota.clasificacion}</p>
            <button onClick={() => handleEdit(nota.id)}>Editar</button>
            <button onClick={() => handleDelete(nota.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
