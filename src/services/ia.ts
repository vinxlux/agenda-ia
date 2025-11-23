// Implementação segura mínima para evitar erros de build.
// Este arquivo deve ser substituído por uma integração real e
// as chaves de API devem vir de variáveis de ambiente.

import type { Agenda } from '../types/agenda';

export async function gerarAgenda(texto: string): Promise<{ agenda: Agenda; log?: string; mestreLog?: string }> {
  // Implementação mínima: não chama APIs externas, apenas retorna um agenda vazia
  const empty: Agenda = { segunda: [], terca: [], quarta: [], quinta: [], sexta: [], sabado: [], domingo: [] };
  return { agenda: empty, log: 'Gerador offline (placeholder)', mestreLog: '' };
}

export async function interpretarComando(agenda: any, comando: string): Promise<any> {
  // Placeholder que aceita comandos locais simples sem alteração real.
  // A implementação real deve alterar o objeto `agenda` conforme o comando.
  return { action: 'ok' };
}

export async function migrarCoresEmBanco(): Promise<void> {
  // No-op: mantido para compatibilidade com AgendaContext
  return;
}

export default { gerarAgenda, interpretarComando, migrarCoresEmBanco };
