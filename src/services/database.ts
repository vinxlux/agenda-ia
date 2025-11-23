import Dexie from 'dexie';

export interface TarefaRecord {
  id?: number;
  dia: string;
  horario: string;
  tarefa: string;
  corFundo?: string | null;
  corTexto?: string | null;
  origem?: string | null; // 'ia' | 'user' | null
}

const db = new Dexie('AgendaDB');

// bump DB version to include 'origem' field
db.version(1).stores({
  tarefas: '++id,dia,horario,tarefa,corFundo,corTexto',
});
db.version(2).stores({
  tarefas: '++id,dia,horario,tarefa,corFundo,corTexto,origem',
});

export async function initializeDatabase() {
  // Dexie auto-opens on first access; ensure DB is ready
  await db.open();
}

export async function adicionarTarefa(dia: string, horario: string, tarefa: string, corFundo?: string | null, corTexto?: string | null, origem?: string | null) {
  // preserve explicit nulls; normalize undefined -> null for consistency
  const record: TarefaRecord = { dia, horario, tarefa, corFundo: corFundo ?? null, corTexto: corTexto ?? null, origem: origem ?? null };
  return db.table('tarefas').add(record);
}

export async function modificarTarefa(id: number, horario: string, tarefa: string, corFundo?: string | null, corTexto?: string | null) {
  const changes: Partial<TarefaRecord> = { horario, tarefa };
  // allow explicitly setting colors to null
  if (corFundo !== undefined) changes.corFundo = corFundo ?? null;
  if (corTexto !== undefined) changes.corTexto = corTexto ?? null;
  return db.table('tarefas').update(id, changes);
}

export async function excluirTarefa(id: number) {
  return db.table('tarefas').delete(id);
}

export async function obterTarefasPorDia(dia: string) {
  return db.table('tarefas').where('dia').equals(dia).toArray();
}

export async function obterTodasTarefas() {
  return db.table('tarefas').toArray();
}

// Persist a full agenda (map of day -> array of task-like objects) to the DB.
// This implementation clears the `tarefas` table and re-inserts all tasks
// from the provided agenda. Each task should be an object with { horario, tarefa, corFundo?, corTexto?, origem? }.
export async function salvarAgendaCompleta(agenda: Record<string, any[]>) {
  // build records in the DB format
  const records: TarefaRecord[] = [];
  Object.keys(agenda || {}).forEach((dia) => {
    (agenda[dia] || []).forEach((t) => {
      records.push({
        dia,
        horario: t.horario || '',
        tarefa: t.tarefa || '',
        corFundo: t.corFundo ?? null,
        corTexto: t.corTexto ?? null,
        origem: t.origem ?? 'user',
      });
    });
  });

  // replace table contents atomically
  return db.transaction('rw', db.table('tarefas'), async () => {
    await db.table('tarefas').clear();
    if (records.length > 0) {
      await db.table('tarefas').bulkAdd(records);
    }
  });
}

// Load all tasks from DB and return as an Agenda-like map: { segunda: [...], ... }
export async function carregarAgendaComoMapa() {
  const todas = await obterTodasTarefas();
  const mapa: Record<string, any[]> = { segunda: [], terca: [], quarta: [], quinta: [], sexta: [], sabado: [], domingo: [] };
  todas.forEach((t: any) => {
    const dia = (t.dia || '').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    if (!mapa[dia]) mapa[dia] = [];
    mapa[dia].push({ id: t.id, horario: t.horario, tarefa: t.tarefa, corFundo: t.corFundo ?? null, corTexto: t.corTexto ?? null, origem: t.origem ?? null });
  });
  return mapa;
}

export async function fecharDatabase() {
  await db.close();
}