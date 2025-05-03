import React, { useState } from 'react';
import api from '../api';

export default function MovieForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [review, setReview] = useState('');
  const [season, setSeason] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { title, genre, releaseDate, review };
    if (season) payload.season = +season;

    api.post('/movies', payload)
      .then(() => {
        onSuccess();
        setTitle(''); setGenre(''); setReleaseDate(''); setReview(''); setSeason('');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Crear Película / Serie</h3>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        required
      /><br/>
      <input
        type="text"
        value={genre}
        onChange={e => setGenre(e.target.value)}
        placeholder="Género"
      /><br/>
      <input
        type="date"
        value={releaseDate}
        onChange={e => setReleaseDate(e.target.value)}
        placeholder="Fecha de estreno"
      /><br/>
      <textarea
        value={review}
        onChange={e => setReview(e.target.value)}
        placeholder="Reseña general"
      /><br/>
      <input
        type="number"
        value={season}
        onChange={e => setSeason(e.target.value)}
        placeholder="Temporada (opcional)"
      /><br/>
      <button type="submit">Guardar Película/Serie</button>
    </form>
  );
}