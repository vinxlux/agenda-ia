# Agenda Semanal com IA (Frontend)

Projeto front-end pronto para a Global Solution. Usa React + Vite + TypeScript e TailwindCSS.

## Quickstart

1. Copie `.env.example` para `.env` e preencha `VITE_IA_KEY`.
2. `npm install`
3. `npm run dev`
4. Abra `http://localhost:5173`

# Agenda Semanal com IA (Frontend)

Projeto front-end implementado com Vite + React + TypeScript e Tailwind CSS. Esta aplicação permite criar e organizar tarefas semanais, com suporte a entrada em linguagem natural e integração opcional com provedores de IA.

---

## 1. Título e Descrição

- **Título:** Agenda Semanal com IA
- **Descrição:** Aplicação front-end para gerenciar tarefas semanais usando entradas em linguagem natural; integra recursos de IA para sugestões (opcional).

## 2. Status do Projeto

- Em desenvolvimento — funcionalidades centrais implementadas (criação/edição/visualização de tarefas, páginas obrigatórias, integração IA placeholder, persistência local via IndexedDB).

## 3. Sumário

- Sobre o projeto
- Tecnologias utilizadas
- Instalação
- Como usar
- Estrutura de pastas
- Rotas principais
- Autores e créditos
- Screenshots / Demonstração
- Contato

## 4. Sobre o Projeto

Projeto desenvolvido como exercício prático para integrar front-end moderno (Vite + TypeScript) com armazenamento local (IndexedDB via Dexie) e uma camada opcional de IA para interpretar comandos em linguagem natural.

## 5. Tecnologias Utilizadas

- Vite
- React
- TypeScript
- Tailwind CSS
- Dexie (IndexedDB)
- react-router-dom

## 6. Instalação

Pré-requisitos: Node.js (>= 18) e npm.

```bash
git clone https://github.com/vinxlux/agenda-ia.git
cd agenda-ia
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Build para produção:

```bash
npm run build
```

## 7. Como Usar

- Acesse `http://localhost:3000/` (ou porta exibida pelo Vite).
- Use o campo principal para inserir instruções: exemplos:
	- `segunda 09:00 - Academia`
	- `adicionar terça 19:00 - Jantar`
	- `organizar reunião com o time na quarta à tarde`
- Revise e confirme as sugestões geradas pela IA (se ativada) antes de salvar.

## 8. Estrutura de Pastas

```
agenda-ia/
├─ src/
│  ├─ assets/           # imagens e recursos
│  ├─ components/       # componentes reutilizáveis
│  ├─ contexts/         # providers (Agenda, Theme, etc.)
│  ├─ pages/            # páginas (Home, About, FAQ, Contato, Integrantes...)
│  ├─ services/         # integração IA, DB
│  ├─ types/            # tipagens TypeScript
│  └─ main.tsx
├─ index.html
├─ package.json
└─ README.md
```

## 9. Endpoints / Rotas Principais

- `/` — Home (com prompt e visualização semanal)
- `/about` — Sobre o projeto
- `/faq` — Perguntas frequentes
- `/contato` — Contato / Formulário
- `/integrantes` — Identificação dos integrantes (nome, RM, turma, foto, GitHub, LinkedIn)
- `/tarefa/:id` — Visualizar/editar tarefa específica

## 10. Autores e Créditos

- Mathaus Victor Souza — RM 564146 — Turma 1TDSPJ — https://github.com/Mathausz
- Carlos Alberto Guedes — RM 566022 — Turma 1TDSPJ — https://github.com/carlosguedesneto
- Vinícius L. E. M. Garcia — RM 563340 — Turma 1TDSPJ — https://github.com/vinxlux

## 11. Screenshots / Demonstração

Adicione screenshots na pasta `docs/screenshots/` e atualize os links abaixo.

- Demo (YouTube): https://youtu.be/SEU_VIDEO_AQUI

## 12. Contato

- Repositório: https://github.com/vinxlux/agenda-ia
- Email: contato@exemplo.com (substitua pelo contato real)

---

### Observações finais

Se desejar, eu posso:

- Inserir screenshots reais em `docs/screenshots/` e atualizar este README.
- Substituir o link do YouTube pelo vídeo real.
- Gerar um arquivo `README.pdf` ou um ZIP com `dist/` pronto para entrega.
