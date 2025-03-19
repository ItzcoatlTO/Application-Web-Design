import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 📌 Obtener la ruta actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "public/imagenes")));

// 📌 Configurar almacenamiento de imágenes con Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/imagenes"),
  filename: (req, file, cb) => {
    cb(null, `superheroe-${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});
const upload = multer({ storage });

// 📌 Ruta para subir una imagen y devolver la URL
app.post("/subir-imagen", upload.single("foto"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No se subió ninguna imagen." });
  res.json({ url: `/imagenes/${req.file.filename}` });
});

// 📌 Ruta para obtener todos los superhéroes
app.get("/superheroes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
  res.json(data.superheroes);
});

// 📌 Ruta para agregar un nuevo superhéroe
app.post("/superheroes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
  const nuevoSuperheroe = { ...req.body, id: data.superheroes.length + 1 };
  data.superheroes.push(nuevoSuperheroe);
  fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(data, null, 2));
  res.json(nuevoSuperheroe);
});

// 📌 Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});
