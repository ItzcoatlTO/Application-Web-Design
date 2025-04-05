const Contacto: React.FC = () => {
    return (
      <div>
        <h2>Ponte en contacto con nosotros ✉️</h2>
        <p>Si tienes alguna duda, escríbenos a <strong>ItzcoatlTO@gmail.com</strong></p>
        <form style={{ marginTop: '1rem', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder=" Nombre"
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="email"
            placeholder=" Correo"
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <textarea
            placeholder=" Mensaje"
            rows={4}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  };
  
  export default Contacto;
  