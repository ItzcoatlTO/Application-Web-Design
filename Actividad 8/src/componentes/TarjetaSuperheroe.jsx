import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function TarjetaSuperheroe({ hero }) {
  return (
    <Card sx={{ width: 280, height: 420, display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={`http://localhost:5000${hero.foto}`}
        alt={hero.nombreHeroe}
        sx={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography variant="h6">{hero.nombreHeroe}</Typography>
        <Typography variant="subtitle2" color="textSecondary">{hero.nombreReal}</Typography>
        <Typography variant="body2">{hero.descripcion}</Typography>
      </CardContent>
    </Card>
  );
}

export default TarjetaSuperheroe;
