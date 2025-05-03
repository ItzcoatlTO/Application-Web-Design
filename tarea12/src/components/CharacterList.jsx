import React, { useEffect, useState } from 'react';
import api from '../api';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    api.get('/characters')
      .then(res => setCharacters(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    api.delete(`/characters/${id}`)
      .then(() => setCharacters(chars => chars.filter(c => c.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Personajes</h2>
      <ul>
        {characters.map(c => (
          <li key={c.id} style={{ marginBottom: '1rem' }}>
            <img src={c.imageUrl} alt={c.name} width={80} style={{ marginRight: '0.5rem' }} />
            <strong>{c.name}</strong><br/>
            {c.description}<br/>
            <small>Aparece en {c.movieIds.length} películas/series</small><br/>
            <button onClick={() => handleDelete(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}