import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Agenda } from '../types/agenda';
import { carregarAgendaComoMapa, salvarAgendaCompleta } from '../services/database';
import { migrarCoresEmBanco } from '../services/ia';

export const EMPTY_AGENDA: Agenda = { segunda: [], terca: [], quarta: [], quinta: [], sexta: [], sabado: [], domingo: [] };

type AgendaContextType = {
  agenda: Agenda;
  setAgenda: (a: Agenda) => void;
  resetAgenda: () => void;
};

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

export function AgendaProvider({ children }: { children: React.ReactNode }) {
  const [agenda, setAgenda] = useState<Agenda>(EMPTY_AGENDA);
  // indexColors feature removed — color-per-index was deprecated in favor of per-task colors

  // load persisted agenda on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // run color migration once so stored hex/names are converted to palette keys
        try {
          await migrarCoresEmBanco();
        } catch (me) {
          console.warn('Migração de cores falhou ou não foi necessária:', me);
        }
        const mapa = await carregarAgendaComoMapa();
        if (mounted) setAgenda((prev) => ({ ...prev, ...mapa }));
      } catch (e) {
        console.error('Erro ao carregar agenda do DB:', e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const resetAgenda = () => setAgenda(EMPTY_AGENDA);

  // wrapper to set agenda and persist to DB
  const setAgendaPersist = (a: Agenda) => {
    setAgenda(a);
    // persist in background
    (async () => {
      try {
        await salvarAgendaCompleta(a as Record<string, any[]>);
      } catch (e) {
        console.error('Erro ao salvar agenda no DB:', e);
      }
    })();
  };

  return (
    <AgendaContext.Provider value={{ agenda, setAgenda: setAgendaPersist, resetAgenda }}>
      {children}
    </AgendaContext.Provider>
  );
}

export function useAgenda() {
  const ctx = useContext(AgendaContext);
  if (!ctx) throw new Error('useAgenda must be used within AgendaProvider');
  return ctx;
}
