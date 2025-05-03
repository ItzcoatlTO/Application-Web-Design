import React, { useEffect, useState } from 'react';
import api from '../api';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    api.delete(`/movies/${id}`)
      .then(() => setMovies(ms => ms.filter(m => m.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Películas / Series</h2>
      <ul>
        {movies.map(m => (
          <li key={m.id} style={{ marginBottom: '1rem' }}>
            <strong>{m.title}</strong> ({m.genre})<br/>
            Estreno: {m.releaseDate}{m.season && ` • Temporada ${m.season}`}<br/>
            <em>{m.review}</em><br/>
            <button onClick={() => handleDelete(m.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}