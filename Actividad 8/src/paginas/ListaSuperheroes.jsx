import { useEffect, useState } from "react";
import axios from "axios";
import TarjetaSuperheroe from "../componentes/TarjetaSuperheroe";
import { Container, Grid, Typography, Box } from "@mui/material";

function ListaSuperheroes() {
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/superheroes").then((res) => setSuperheroes(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Lista de Superhéroes
      </Typography>
      {/* 📌 Corrigiendo el solapamiento con `display: flex` */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, paddingBottom: "40px" }}>
        {superheroes.map((hero) => (
          <TarjetaSuperheroe key={hero.id} hero={hero} />
        ))}
      </Box>
    </Container>
  );
}

export default ListaSuperheroes;
