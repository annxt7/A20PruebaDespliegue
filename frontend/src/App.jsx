import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  async function loadItems() {
    const res = await fetch(`${API_URL}/api/items`);
    const data = await res.json();
    setItems(data.items);
  }

  async function addItem(e) {
    e.preventDefault();
    await fetch(`${API_URL}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Actividad DPL Fullstack</h1>
      <form onSubmit={addItem}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button>Añadir</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}