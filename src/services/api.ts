export async function buscarTarefas(token: string) {
  const res = await fetch(`${API_URL}/tarefas`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Não foi possível buscar tarefas");
  return await res.json();
}
// src/services/api.ts

const API_URL = "https://api-java-tarefas.onrender.com";

export async function cadastrarUsuario(usuario: { login: string; senha: string }) {
  const res = await fetch(`${API_URL}/auth/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: usuario.login, senha: usuario.senha }),
  });
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    const msg = data?.message || data?.erro || data?.error || res.statusText || "Erro ao cadastrar usuário";
    throw new Error(msg);
  }
  return data;
}

export async function loginUsuario(login: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, senha }),
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    const msg = data?.message || data?.erro || data?.error || res.statusText || "Login inválido";
    throw new Error(msg);
  }
  return data;
}
