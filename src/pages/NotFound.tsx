import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/', { replace: true, state: { msg: 'notfound' } }), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center bg-white dark:bg-slate-800 rounded">
      <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Página não encontrada</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-4">Você será redirecionado para a página inicial em 2 segundos.</p>
      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate('/')}>Ir para Início agora</button>
    </div>
  );
}
