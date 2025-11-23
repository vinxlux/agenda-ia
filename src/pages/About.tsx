import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Sobre este projeto</h1>

      <p className="mb-4 text-gray-900 dark:text-gray-200">Este projeto é uma aplicação de agenda semanal com funcionalidades de suporte por IA, criada como exemplo para integração de tecnologias front-end e armazenamento local. O objetivo é facilitar a criação de compromissos a partir de linguagem natural e oferecer uma interface simples para gerenciamento semanal.</p>

      <h2 className="font-semibold text-gray-900 dark:text-gray-50">Principais objetivos</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-900 dark:text-gray-200">
        <li>Permitir entrada rápida de tarefas via texto natural.</li>
        <li>Utilizar IA para sugerir e estruturar compromissos.</li>
        <li>Persistir dados localmente com IndexedDB para uso offline.</li>
      </ul>

      <h2 className="font-semibold text-gray-900 dark:text-gray-50">Tecnologias</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-900 dark:text-gray-200">
        <li>React + TypeScript</li>
        <li>Vite (bundler/DEV server)</li>
        <li>Tailwind CSS para estilos</li>
        <li>IndexedDB via Dexie (armazenamento local)</li>
        <li>Integração opcional com APIs de IA (ver <code>src/services/ia.ts</code>)</li>
      </ul>

      <h2 className="font-semibold text-gray-900 dark:text-gray-50">Equipe e contribuições</h2>
      <p className="text-gray-900 dark:text-gray-200 mb-4">Veja a página <Link to="/integrantes" className="text-blue-600 dark:text-blue-300">Integrantes</Link> para informações sobre os autores. Contribuições são bem-vindas: abra issues ou pull requests no repositório com descrições claras do que deseja alterar.</p>

      <h2 className="font-semibold text-gray-900 dark:text-gray-50">Como contribuir</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-900 dark:text-gray-200">
        <li>Abra uma issue descrevendo o problema ou proposta.</li>
        <li>Crie um fork e envie um pull request com testes/descrição.</li>
        <li>Respeite o estilo de código do projeto (TypeScript + Tailwind).</li>
      </ul>

      <h2 className="font-semibold text-gray-900 dark:text-gray-50">Licença e contato</h2>
      <p className="text-gray-900 dark:text-gray-200">Este repositório inclui arquivos de exemplo para fins educacionais. Para contato ou dúvidas, use as informações na página <Link to="/integrantes" className="text-blue-600 dark:text-blue-300">Integrantes</Link>.</p>

    </div>
  );
}
