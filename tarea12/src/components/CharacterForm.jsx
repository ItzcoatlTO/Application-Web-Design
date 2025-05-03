import React, { useState, useEffect } from 'react';
import api from '../api';

export default function CharacterForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [movieIds, setMovieIds] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/characters', { name, movieIds, imageUrl, description })
      .then(() => {
        onSuccess();
        setName(''); setMovieIds([]); setImageUrl(''); setDescription('');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Crear Personaje</h3>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
        required
      /><br/>
      <select
        multiple
        value={movieIds}
        onChange={e => setMovieIds([...e.target.selectedOptions].map(o => +o.value))}
      >
        {movies.map(m => (
          <option key={m.id} value={m.id}>{m.title}</option>
        ))}
      </select><br/>
      <input
        type="url"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="URL de imagen"
      /><br/>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descripción general"
      /><br/>
      <button type="submit">Guardar Personaje</button>
    </form>
  );
}