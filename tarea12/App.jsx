import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage';
import MoviesPage from './pages/MoviesPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/characters" style={{ marginRight: '1rem' }}>Personajes</Link>
        <Link to="/movies">Películas/Series</Link>
      </nav>
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}