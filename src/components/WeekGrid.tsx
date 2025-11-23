import React from 'react';
import { Link } from 'react-router-dom';
import { useAgenda } from '../contexts/AgendaContext';
import { modificarTarefa } from '../services/database';

export default function WeekGrid({ agenda: propAgenda }: any) {
  const { agenda, setAgenda } = useAgenda();
  // prefer context agenda if provided, fallback to prop
  const current = agenda || propAgenda || {};
  // no palette: show a color input per slot to let user pick any color
  const DIAS: Array<'segunda'|'terca'|'quarta'|'quinta'|'sexta'|'sabado'|'domingo'> = ['segunda','terca','quarta','quinta','sexta','sabado','domingo'];

  // Fixed Tailwind-only palette. Stored values in tarefa.corFundo / corTexto should
  // be the palette `key` (e.g. 'rose-100'). If existing DB values are hex, they
  // will be ignored visually until user selects a palette value.
  const PALETTE = [
    { key: 'white', bg: 'bg-white', text: 'text-black', label: 'White' },
    { key: 'slate-50', bg: 'bg-slate-50', text: 'text-slate-800', label: 'Slate' },
    { key: 'rose-100', bg: 'bg-rose-100', text: 'text-rose-800', label: 'Rose' },
    { key: 'amber-100', bg: 'bg-amber-100', text: 'text-amber-800', label: 'Amber' },
    { key: 'emerald-100', bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Green' },
    { key: 'sky-100', bg: 'bg-sky-100', text: 'text-sky-800', label: 'Blue' },
    { key: 'violet-100', bg: 'bg-violet-100', text: 'text-violet-800', label: 'Violet' },
    { key: 'neutral-100', bg: 'bg-neutral-100', text: 'text-neutral-800', label: 'Neutral' },
  ];

  function findPalette(key: string | null | undefined) {
    if (!key) return PALETTE[0];
    const p = PALETTE.find((x) => x.key === key);
    return p || PALETTE[0];
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {DIAS.map((dia) => (
        <div key={dia} className="border rounded p-3 min-h-[120px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h3 className="font-bold capitalize">{dia}</h3>
          {/* index swatches removed per user request */}

          {Array.isArray((current as any)[dia]) && (current as any)[dia].length > 0 ? (
            <ul className="list-none mt-2">
              {(current as any)[dia].map((tarefa: any, i: number) => {
                const bgPalette = findPalette(tarefa?.corFundo);
                const textPalette = findPalette(tarefa?.corTexto);
                return (
                  <li key={i} className={`${bgPalette.bg} ${textPalette.text} p-2 rounded-md mb-2 flex items-start dark:shadow-sm`}> 
                    {tarefa?.id ? (
                      <Link to={`/tarefa/${tarefa.id}`} className="w-full focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-500 rounded" title="Editar tarefa">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">[{i}]</span>
                          {tarefa?.origem && (
                            <span
                              title={tarefa.origem === 'ia' ? 'Origem: IA' : 'Origem: Usuário'}
                              className={`inline-block w-2 h-2 rounded-full ${tarefa.origem === 'ia' ? 'bg-red-500' : tarefa.origem === 'user' ? 'bg-green-500' : 'bg-gray-300'}`}
                            />
                          )}
                          <span className="ml-1">{tarefa.horario ? `${tarefa.horario} - ` : ''}{tarefa.tarefa}</span>
                        </div>
                      </Link>
                    ) : (
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">[{i}]</span>
                          {tarefa?.origem && (
                            <span
                              title={tarefa.origem === 'ia' ? 'Origem: IA' : 'Origem: Usuário'}
                              className={`inline-block w-2 h-2 rounded-full ${tarefa.origem === 'ia' ? 'bg-red-500' : tarefa.origem === 'user' ? 'bg-green-500' : 'bg-gray-300'}`}
                            />
                          )}
                          <span className="ml-1">{tarefa.horario ? `${tarefa.horario} - ` : ''}{tarefa.tarefa}</span>
                        </div>
                      </div>
                    )}

                    {/* palette controls removed per user request */}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-400 dark:text-slate-400">Sem tarefas</p>
          )}
        </div>
      ))}
    </div>
  );
}

