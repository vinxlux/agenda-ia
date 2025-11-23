export type Day = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export interface Task {
  id?: number;
  horario: string;
  tarefa: string;
  corFundo?: string | null; // palette key or null
  corTexto?: string | null; // palette key or null
  origem?: 'ia' | 'user' | null;
}

// Agenda is a mapping of Day -> Task[]
export type Agenda = Record<Day, Task[]>;

// Example of union type for color keys (partial)
export type ColorKey = 'white' | 'slate-50' | 'rose-100' | 'amber-100' | 'emerald-100' | 'sky-100' | 'violet-100' | 'neutral-100' | string;

// Example of intersection type: persisted task extends Task with persisted marker
export type PersistedTask = Task & { persisted: true };

export default Agenda;
