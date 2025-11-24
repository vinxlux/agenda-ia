import React, { useState } from "react";
import { buscarTarefas } from "../services/api";

export default function TarefasPage() {
  const [token, setToken] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function handleBuscar() {
    setError("");
    try {
      const lista = await buscarTarefas(token);
      setTarefas(lista);
    } catch (err) {
      setError("Erro ao buscar tarefas (token inválido?)");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Buscar Tarefas</h2>
      <input className="border p-2 w-full mb-2" placeholder="Token JWT" value={token} onChange={e => setToken(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4" onClick={handleBuscar}>Buscar</button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul className="list-disc pl-5">
        {tarefas.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}
