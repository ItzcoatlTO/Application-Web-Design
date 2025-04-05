import './Inicio.css';

const Inicio: React.FC = () => {
  return (
    <div className="inicio-container">
      <h1 className="inicio-title">¡Bienvenido a nuestra galeria de Anime! 🌟</h1>
      <p className="inicio-subtitle">
        Explora nuestras fotos, conoce más sobre nosotros y no dudes en ponerte en contacto.
      </p>

      <div className="inicio-cards">
        <div className="card">
          <span className="emoji">📷</span>
          <h3>Galería</h3>
          <p>Descubre imágenes hermosas de estilo anime .</p>
        </div>
        <div className="card">
          <span className="emoji">📬</span>
          <h3>Contacto</h3>
          <p>¿Tienes preguntas? Contáctanos fácilmente a través de nuestro formulario.</p>
        </div>
        <div className="card">
          <span className="emoji">🌐</span>
          <h3>Explora</h3>
          <p>Navega entre las secciones con una experiencia visual moderna y responsiva.</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
