import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Inicio from './pages/Inicio';
import Fotos from './pages/Fotos';
import Contacto from './pages/Contacto';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/fotos" element={<Fotos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default App;
