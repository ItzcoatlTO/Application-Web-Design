import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "public/imagenes")));

const dbPath = path.join(__dirname, "db.json");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/imagenes"),
  filename: (req, file, cb) => {
    cb(null, `superheroe-${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});
const upload = multer({ storage });

const leerDB = () => JSON.parse(fs.readFileSync(dbPath));
const guardarDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

app.post("/subir-imagen", upload.single("foto"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No se subió ninguna imagen." });
  res.json({ url: `/imagenes/${req.file.filename}` });
});

app.get("/superheroes", (req, res) => {
  const data = leerDB();
  res.json(data.superheroes.filter((h) => h.activo));
});

app.get("/superheroes/eliminados", (req, res) => {
  const data = leerDB();
  res.json(data.superheroes.filter((h) => !h.activo));
});

app.post("/superheroes", (req, res) => {
  const data = leerDB();
  const nuevo = { ...req.body, id: Date.now(), activo: true };
  data.superheroes.push(nuevo);
  guardarDB(data);
  res.json(nuevo);
});

app.delete("/superheroes/:id", (req, res) => {
  const data = leerDB();
  const id = parseInt(req.params.id);
  const heroe = data.superheroes.find((h) => h.id === id);
  if (!heroe) return res.status(404).json({ error: "No encontrado" });
  heroe.activo = false;
  guardarDB(data);
  res.json({ mensaje: "Superhéroe eliminado (lógicamente)" });
});

app.patch("/superheroes/restaurar/:id", (req, res) => {
  const data = leerDB();
  const id = parseInt(req.params.id);
  const heroe = data.superheroes.find((h) => h.id === id);
  if (!heroe) return res.status(404).json({ error: "No encontrado" });
  heroe.activo = true;
  guardarDB(data);
  res.json({ mensaje: "Superhéroe restaurado" });
});

app.listen(5000, () => console.log("🚀 API activa en http://localhost:5000"));
