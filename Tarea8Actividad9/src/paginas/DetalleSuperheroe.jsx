import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import "../styles.css"; // Importar los estilos

function DetalleSuperheroe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/superheroes/${id}`)
      .then((res) => setHero(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  const eliminarHeroe = () => {
    axios.delete(`http://localhost:5000/superheroes/${id}`)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  if (!hero) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Card className="tarjeta">
        <CardMedia component="img" image={hero.foto} alt={hero.nombreHeroe} />
        <CardContent>
          <Typography variant="h3">{hero.nombreHeroe}</Typography>
          <Typography variant="h5">{hero.nombreReal}</Typography>
          <Button className="boton-eliminar" onClick={eliminarHeroe}>
            Eliminar
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DetalleSuperheroe;

