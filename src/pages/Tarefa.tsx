import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obterTodasTarefas, modificarTarefa } from '../services/database';
import type { Task } from '../types/agenda';

export default function TarefaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return setLoading(false);
      try {
        const todas = await obterTodasTarefas();
        const found = todas.find((t: any) => String(t.id) === String(id));
        if (mounted) setTarefa(found ? { id: found.id, horario: found.horario || '', tarefa: found.tarefa || '', corFundo: found.corFundo ?? null, corTexto: found.corTexto ?? null, origem: found.origem ?? null } : null);
      } catch (e) {
        console.error('Erro ao buscar tarefa:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-4">Carregando...</div>;
  if (!tarefa) return (
    <div className="p-4">
      <p className="text-red-600 dark:text-rose-300">Tarefa não encontrada.</p>
      <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate('/')}>Voltar</button>
    </div>
  );

  async function handleSave() {
    setSaving(true);
    try {
      if (tarefa && tarefa.id) {
        if (tarefa) {
          await modificarTarefa(tarefa.id, tarefa.horario || '', tarefa.tarefa || '', tarefa.corFundo ?? null, tarefa.corTexto ?? null);
        }
      }
      navigate('/');
    } catch (e) {
      console.error('Erro ao salvar tarefa:', e);
      alert('Erro ao salvar tarefa. Veja console.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded shadow">
      <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Editar tarefa (id: {tarefa.id})</h2>
      <label className="block mb-2">
        <div className="text-sm text-slate-700">Horário</div>
        <input aria-label="Horário" placeholder="ex: 09:00" className="mt-1 w-full border border-slate-200 dark:border-slate-600 rounded px-2 py-2 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-500" value={tarefa.horario} onChange={(e) => setTarefa({ ...tarefa, horario: e.target.value })} />
      </label>
      <label className="block mb-2">
        <div className="text-sm text-slate-700">Descrição</div>
        <input aria-label="Descrição" placeholder="Descreva a tarefa" className="mt-1 w-full border border-slate-200 dark:border-slate-600 rounded px-2 py-2 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-500" value={tarefa.tarefa} onChange={(e) => setTarefa({ ...tarefa, tarefa: e.target.value })} />
      </label>
      <label className="block mb-4">
        <div className="text-sm text-slate-700">Cor de fundo (chave de paleta)</div>
        <input aria-label="Cor de fundo" placeholder="Ex: emerald-100" className="mt-1 w-full border border-slate-200 dark:border-slate-600 rounded px-2 py-2 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-500" value={tarefa.corFundo ?? ''} onChange={(e) => setTarefa({ ...tarefa, corFundo: e.target.value })} />
      </label>
      <div className="flex gap-3">
        <button className="px-3 py-2 bg-green-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-300" onClick={handleSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
        <button className="px-3 py-2 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-300" onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </div>
  );
}
