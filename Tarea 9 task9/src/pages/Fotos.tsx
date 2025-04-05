const Fotos: React.FC = () => {
    return (
      <div>
        <h2>Galería de Imágenes Anime ✨</h2>
        <p>Alguna de nuestras fotos:</p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <img
            src="https://wallpapers.com/images/featured/lindo-anime-kawaii-skfamisrwr4ylljz.jpg"
            alt="Anime Kawaii 1"
            style={{ width: '300px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          />
          <img
            src="https://www.anmosugoi.com/wp-content/uploads/2025/02/Makeine_-Too-Many-Losing-Heroines-Portada.webp"
            alt="Makeine Heroínas"
            style={{ width: '300px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>
    );
  };
  
  export default Fotos;
  