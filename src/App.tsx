import React, { useState } from 'react';
import TextPrompt from './components/TextPrompt';
import WeekGrid from './components/WeekGrid';
import type { Agenda } from './types/agenda';
import { gerarAgenda, interpretarComando } from './services/ia';
import { useAgenda, EMPTY_AGENDA } from './contexts/AgendaContext';

export default function App() {
  const [texto, setTexto] = useState('');
  const { agenda, setAgenda } = useAgenda();
  const [loading, setLoading] = useState(false);
  const [logIa, setLogIa] = useState('');
  const [mestreLog, setMestreLog] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleGerar() {
    if (!texto.trim()) {
      setErrorMessage('Por favor, preencha a descrição antes de gerar a agenda.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const commandKeywords = ['adicionar', 'excluir', 'colorir', 'cor', 'cortexto', 'texto', 'textcolor', 'corindice', 'colorindex', 'indicecor', 'indice'];
      const kwRegex = new RegExp(`\\b(${commandKeywords.join('|')})\\b`, 'i');
      // Heuristic guard: if the input doesn't contain any command keywords, day names or times
      // and is very short/noisy (like 'aaaaa'), avoid calling the IA to prevent accidental runs.
      const trimmed = texto.trim();
      const hasTime = /\d{1,2}:\d{2}/.test(texto);
      const hasDay = /(segunda|terca|quarta|quinta|sexta|sabado|domingo)/i.test(texto);
      // detect obvious repeated-character noise like 'aaaaaaa' or very short tokens without vowels
      const isSingleRepeated = /^(.)(\1{4,})$/.test(trimmed); // same char repeated 5+ times
      const vowelCount = (trimmed.match(/[aeiouáàãâéêíóôõúü]/gi) || []).length;
      const vowelRatio = trimmed.length > 0 ? vowelCount / trimmed.length : 0;
      const isShort = trimmed.length <= 12 && !trimmed.includes(' ');
      const isLikelyNoise = isShort && (isSingleRepeated || vowelRatio < 0.15);

      if (!kwRegex.test(texto) && !hasTime && !hasDay && isLikelyNoise) {
        setErrorMessage('Entrada parece ruído ou sem formato reconhecível — confirme antes de gerar. Use "segunda 09:00 - tarefa" ou escreva uma descrição maior.');
        setLoading(false);
        return;
      }

      if (kwRegex.test(texto)) {
        // Split user input into parts by newlines, semicolons, commas or dashes (handles multi-line paste)
        const parts = texto.split(/(?:\r?\n|[;,]+|—|–)/).map((p) => p.trim()).filter(Boolean);
        const mestreMsgs: string[] = [];
        // lastAdded tracking: when we add via 'adicionar' or day-segment we set this to allow bare colors to apply
        let lastAdded: { day: string; idx: number } | null = null;

        for (const part of parts) {
          try {
            const tok = part.split(' ').map((s) => s.trim()).filter(Boolean);
            const first = (tok[0] || '').toLowerCase();
            const lowerTok = tok.map((t) => t.toLowerCase());
            const containsCommand = lowerTok.some((t) => commandKeywords.includes(t));

            // Detect routine instruction like 'rotina ... 6 dias' or 'rotina ... seis dias'
            const isRotina = /rotin/i.test(part) && /(6\s*dias|seis\s*dias)/i.test(part);
            if (isRotina) {
              // default times for entrada/saida
              const entradaTime = '09:00';
              const saidaTime = '17:00';
              const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
              for (const d of dias) {
                try {
                  await interpretarComando(agenda as any, `adicionar ${d} ${entradaTime} - Entrada`);
                  mestreMsgs.push(`Executado: adicionar ${d} ${entradaTime} - Entrada`);
                  await interpretarComando(agenda as any, `adicionar ${d} ${saidaTime} - Saida`);
                  mestreMsgs.push(`Executado: adicionar ${d} ${saidaTime} - Saida`);
                } catch (eAdd: any) {
                  console.error('Erro ao adicionar rotina:', eAdd);
                  mestreMsgs.push(`Erro ao adicionar rotina em ${d}`);
                }
              }
              // apply default colors: entrada -> indice 0 verde, saida -> indice 1 rosa
              try {
                const res0 = await interpretarComando(agenda as any, `corindice 0 verde`);
                if (res0 && res0.action === 'corindice') mestreMsgs.push(`Executado: corindice ${res0.idx} ${res0.label || res0.color}`);
                else mestreMsgs.push('Executado: corindice 0 verde');
              } catch (eC1: any) {
                mestreMsgs.push('Não foi possível aplicar cor indice 0 verde.');
              }
              try {
                const res1 = await interpretarComando(agenda as any, `corindice 1 rosa`);
                if (res1 && res1.action === 'corindice') mestreMsgs.push(`Executado: corindice ${res1.idx} ${res1.label || res1.color}`);
                else mestreMsgs.push('Executado: corindice 1 rosa');
              } catch (eC2: any) {
                mestreMsgs.push('Não foi possível aplicar cor indice 1 rosa.');
              }
              // move to next segment
              continue;
            }

            if (commandKeywords.includes(first) || containsCommand) {
              // explicit command (command may appear anywhere in the segment)
              // find the actual command token to decide special handling
              const cmd = lowerTok.find((t) => commandKeywords.includes(t)) || first;
              if (/^(corindice|colorindex|indicecor)$/i.test(cmd)) {
                const words = part.split(' ').filter(Boolean);
                // if user provided only 'corindice <cor>' or 'corindice <dia>' treat accordingly
                if (words.length === 2) {
                  // assume user meant index 0 when index omitted
                  try {
                    const res = await interpretarComando(agenda as any, `${cmd} 0 ${words[1]}`);
                    if (res && res.action === 'corindice') mestreMsgs.push(`Executado: corindice ${res.idx} ${res.label || res.color}`);
                    else mestreMsgs.push(`Executado: ${cmd} 0 ${words[1]}`);
                  } catch (err) {
                    mestreMsgs.push(`Executado: ${cmd} 0 ${words[1]}`);
                  }
                } else {
                  try {
                    const res = await interpretarComando(agenda as any, part);
                    if (res && res.action === 'corindice') mestreMsgs.push(`Executado: corindice ${res.idx} ${res.label || res.color}`);
                    else mestreMsgs.push(`Executado: ${part}`);
                  } catch (err) {
                    mestreMsgs.push(`Executado: ${part}`);
                  }
                }
              } else {
                // attempt to detect if this is an 'adicionar' that we can track
                await interpretarComando(agenda as any, part);
                mestreMsgs.push(`Executado: ${part}`);
                if (cmd === 'adicionar' && tok.length >= 2) {
                  const maybeDay = tok[1].toLowerCase();
                  if (/^(segunda|terca|quarta|quinta|sexta|sabado|domingo)$/i.test(maybeDay)) {
                    const diaNorm = maybeDay.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                    const idx = (agenda as any)[diaNorm] ? (agenda as any)[diaNorm].length - 1 : -1;
                    if (idx >= 0) lastAdded = { day: diaNorm, idx };
                  }
                }
              }
            } else {
              // day-like segment or color-like segment
              const dayMatch = /^\s*(segunda|terca|quarta|quinta|sexta|sabado|domingo)\b/i.exec(part);
                if (dayMatch) {
                const dia = dayMatch[1].toLowerCase();
                const timeMatch = part.match(/(\d{1,2}:\d{2})/);
                const horario = timeMatch ? timeMatch[1] : '';
                let descricao = part.replace(new RegExp(`^\\s*${dia}`, 'i'), '').replace(horario || '', '').replace(/[-:;,]/g, '').trim();
                if (!descricao) descricao = 'Tarefa não especificada';
                const cmdStr = horario ? `adicionar ${dia} ${horario} - ${descricao}` : `adicionar ${dia} - ${descricao}`;
                await interpretarComando(agenda as any, cmdStr);
                mestreMsgs.push(`Executado: ${cmdStr}`);
                const diaNorm = dia.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                const idx = (agenda as any)[diaNorm] ? (agenda as any)[diaNorm].length - 1 : -1;
                if (idx >= 0) lastAdded = { day: diaNorm, idx };
              } else {
                // ambiguous: could be a bare color
                const colorOnly = /^#?[0-9a-fA-F]{6}$/.test(part) || /^[a-zA-Z\-]+$/.test(part);
                const isDayWord = /^(segunda|terca|quarta|quinta|sexta|sabado|domingo)$/i.test(part);
                if (colorOnly && !isDayWord) {
                  if (lastAdded) {
                    try {
                      await interpretarComando(agenda as any, `cortexto ${lastAdded.day} ${lastAdded.idx} ${part}`);
                      mestreMsgs.push(`Executado: cortexto ${lastAdded.day} ${lastAdded.idx} ${part}`);
                    } catch (eInner: any) {
                      mestreMsgs.push(`Não consegui aplicar '${part}' ao último item; tente 'cortexto ${lastAdded.day} ${lastAdded.idx} ${part}' ou 'corindice 0 ${part}'.`);
                    }
                  } else {
                    try {
                      await interpretarComando(agenda as any, `corindice 0 ${part}`);
                      mestreMsgs.push(`Executado: corindice 0 ${part}`);
                    } catch (eInner: any) {
                      mestreMsgs.push(`Não consegui aplicar '${part}'. Sugestão: 'corindice 0 ${part}' ou 'cortexto <dia> <indice> ${part}'.`);
                    }
                  }
                } else {
                  mestreMsgs.push(`Segmento ignorado: '${part}'. Use 'segunda 09:00 - atividade' ou 'adicionar <dia> <HH:MM> - descrição'.`);
                }
              }
            }
          } catch (segErr: any) {
            // build a suggestion based on the failing segment
            const s = part || '';
            const hasTime = /\d{1,2}:\d{2}/.test(s);
            const looksLikeColor = /^#?[0-9a-fA-F]{6}$/.test(s) || /^[a-zA-Z\-]+$/.test(s);
            if (hasTime) {
              mestreMsgs.push(`Não consegui processar '${s}'. Sugestão: 'adicionar <dia> <HH:MM> - descrição' (ex.: 'adicionar segunda 09:00 - trabalha').`);
            } else if (looksLikeColor) {
              mestreMsgs.push(`Não consegui aplicar a cor '${s}'. Sugestão: 'cortexto <dia> <indice> ${s}' ou 'corindice 0 ${s}'.`);
            } else {
              mestreMsgs.push(`Erro ao processar '${s}'. Separe comandos por ';' e use formatos: 'segunda 09:00 - tarefa' ou 'corindice 0 verde'.`);
            }
            console.error('Erro ao processar segmento:', segErr);
          }
        }

        // update local state and show collected mestre messages (successes and suggestions)
        setAgenda({ ...agenda });
        setLogIa('Comandos processados localmente.');
        if (mestreMsgs.length > 0) setMestreLog('Mestre, ' + mestreMsgs.join(' '));
      } else {
        const { agenda: result, log, mestreLog: mlog } = await gerarAgenda(texto);
        const normalized = { ...EMPTY_AGENDA, ...result };
        setAgenda(normalized);
        setLogIa(log || '');
        setMestreLog(mlog || '');
      }
    } catch (e: any) {
      setLogIa(e?.message || e);
      setErrorMessage(e?.message || 'Erro ao gerar agenda.');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agenda Semanal com IA</h1>
        <div className="text-sm text-gray-700">Feito por Vinicius e equipe</div>
      </header>

      <TextPrompt texto={texto} setTexto={setTexto} onSubmit={handleGerar} logIa={logIa} mestreLog={mestreLog} agenda={agenda} />

      {errorMessage && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}

      {loading ? <p className="mt-4">Gerando agenda...</p> : <WeekGrid agenda={agenda} />}

      <footer className="mt-8 text-xs text-gray-500">
        Dica: descreva dia, hora e atividade. Ex: "segunda 07:00 academia; terça 19:00 inglês; sábado 10:00 supermercado".
      </footer>
    </div>
  );
}
