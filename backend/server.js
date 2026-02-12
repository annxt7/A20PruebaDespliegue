const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(express.json());

app.use(cors({
  origin: CORS_ORIGIN
}));

let nextId = 3;
let items = [
  { id: 1, title: "Desplegar backend en Render", done: true },
  { id: 2, title: "Desplegar frontend en Vercel", done: false }
];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/items", (req, res) => {
  res.json({ items });
});

app.post("/api/items", (req, res) => {
  const { title } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ error: "Título mínimo 3 caracteres" });
  }
  const newItem = { id: nextId++, title, done: false };
  items.unshift(newItem);
  res.status(201).json({ item: newItem });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});