# Agenda Semanal com IA (Frontend)

Projeto front-end pronto para a Global Solution. Usa React + Vite + TypeScript e TailwindCSS.

## Quickstart

1. Copie `.env.example` para `.env` e preencha `VITE_IA_KEY`.
2. `npm install`
3. `npm run dev`
4. Abra `http://localhost:5173`

## Rotas implementadas

- `/` (Home) — página principal com prompt e visualização semanal.
- `/integrantes` — página de integrantes.
- `/about` — sobre o projeto.
- `/faq` — ajuda e exemplos de comandos.
- `/tarefa/:id` — rota dinâmica para visualizar/editar uma tarefa por `id` (ex.: `/tarefa/42`).
- `*` — página não encontrada que redireciona para `/` com mensagem.

## Tipos importantes

- `Task` (interface) — representa uma tarefa com campos: `id?: number`, `horario: string`, `tarefa: string`, `corFundo?: string | null`, `corTexto?: string | null`, `origem?: 'ia'|'user'|null`.
- `Day` (union) — dias da semana.
- `Agenda` — `Record<Day, Task[]>`.

## Como testar rapidamente

1. Instale dependências e rode o dev server:

```bash
npm install
npm run dev
```

2. No navegador, abra `http://localhost:5173` (porta padrão do Vite).
3. Teste rota dinâmica: acesse `/tarefa/1` (ou clique em um link que aponte para uma tarefa existente) para ver e editar.

## Observações para avaliação

- Rotas estáticas e dinâmicas foram implementadas com `react-router-dom` e `createBrowserRouter`.
- Tipos TypeScript foram definidos em `src/types/agenda.ts` com exemplos de Union e Intersection.

### Observações
- Este front está preparado para trabalhar com a API da IA (ex.: GROQ). Troque `VITE_IA_ENDPOINT` se usar outro provedor.
- Para integrar com o backend Java, aponte o fetch de salvar agenda para o endpoint `POST /api/agenda`.

## Arquitetura
- `src/services/ia.ts` - integração com provedor de IA
- `src/components` - UI components
- `src/types` - Tipagens TypeScript

## Requisitos da disciplina
- React + Vite + TypeScript ✅
- TailwindCSS ✅
- Deploy no Vercel (siga as instruções do curso) ✅

Referência do regulamento da Global Solution: /mnt/data/1TDS Fevereiro - Global Solution 2025-2.pdf
