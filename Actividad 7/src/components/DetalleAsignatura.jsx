const editarCalificacion = (id, nuevaCalificacion) => {
    setCalificaciones(
      calificaciones.map((calificacion) =>
        calificacion.id === id ? { ...calificacion, calificacion: nuevaCalificacion } : calificacion
      )
    );
  };
  