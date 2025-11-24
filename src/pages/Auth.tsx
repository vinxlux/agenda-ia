import React, { useState } from "react";
import { cadastrarUsuario, loginUsuario } from "../services/api";

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'cadastro'>('login');

  // Cadastro
  const [loginC, setLoginC] = useState("");
  const [senhaC, setSenhaC] = useState("");
  const [successC, setSuccessC] = useState("");
  const [errorC, setErrorC] = useState("");

  // Login
  const [loginL, setLoginL] = useState("");
  const [senhaL, setSenhaL] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [successL, setSuccessL] = useState("");
  const [errorL, setErrorL] = useState("");

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErrorC("");
    setSuccessC("");
    try {
      await cadastrarUsuario({ login: loginC, senha: senhaC });
      setSuccessC("Usuário cadastrado com sucesso!");
      setLoginC(""); setSenhaC("");
    } catch (err: any) {
      setErrorC(err?.message || "Erro ao cadastrar usuário");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorL("");
    setSuccessL("");
    try {
      const res = await loginUsuario(loginL, senhaL);
      setToken(res.token);
      setSuccessL("Login realizado!");
      setLoginL(""); setSenhaL("");
    } catch (err: any) {
      setErrorL(err?.message || "Login inválido");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('login')} className={`px-4 py-2 rounded ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>Login</button>
        <button onClick={() => setTab('cadastro')} className={`px-4 py-2 rounded ${tab === 'cadastro' ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>Cadastro</button>
      </div>

      {tab === 'cadastro' && (
        <form onSubmit={handleCadastro} className="mb-6">
          <input className="border p-2 w-full mb-2" placeholder="Login" value={loginC} onChange={e => setLoginC(e.target.value)} />
          <input className="border p-2 w-full mb-2" type="password" placeholder="Senha" value={senhaC} onChange={e => setSenhaC(e.target.value)} />
          <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Cadastrar</button>
          {successC && <div className="mt-2 text-green-600">{successC}</div>}
          {errorC && <div className="mt-2 text-red-600">{errorC}</div>}
        </form>
      )}

      {tab === 'login' && (
        <form onSubmit={handleLogin}>
          <input className="border p-2 w-full mb-2" placeholder="Login" value={loginL} onChange={e => setLoginL(e.target.value)} />
          <input className="border p-2 w-full mb-2" type="password" placeholder="Senha" value={senhaL} onChange={e => setSenhaL(e.target.value)} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Entrar</button>
          {token && <div className="mt-4 text-green-700 break-all">Token: {token}</div>}
          {successL && <div className="mt-2 text-green-600">{successL}</div>}
          {errorL && <div className="mt-2 text-red-600">{errorL}</div>}
        </form>
      )}
    </div>
  );
}
