// Sanitized IA helper used for history rewrite. Does not contain secrets.
// This file is used temporarily by the history-rewrite script and can be removed afterwards.

type AgendaResult = {
  agenda: any;
  log?: string;
  mestreLog?: string;
};

function getApiKey(): string | null {
  try {
    // @ts-ignore
    const k = (process && process.env && process.env.IA_API_KEY) || null;
    return k;
  } catch (e) {
    return null;
  }
}

export async function gerarAgenda(texto: string): Promise<AgendaResult> {
  const key = getApiKey();
  if (!key) {
    return {
      agenda: {},
      log: 'IA não configurada: variável IA_API_KEY ausente. Resultado gerado localmente.',
      mestreLog: 'Sem integração externa — use IA_API_KEY para ligar a API.'
    };
  }
  return { agenda: {}, log: 'Chave presente, integração não implementada neste exemplo.', mestreLog: '' };
}

export async function interpretarComando(agenda: any, comando: string): Promise<any> {
  return { action: 'simulado', comando };
}

export default { gerarAgenda, interpretarComando };
