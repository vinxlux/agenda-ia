import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Contato</h1>

      <p className="mb-4 text-gray-900 dark:text-gray-200">Quer enviar feedback, relatar um bug ou colaborar no projeto? Use uma das opções abaixo.</p>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Email</h2>
        <p className="text-gray-900 dark:text-gray-200">Envie um email para <a href="mailto:contato@exemplo.com" className="text-blue-600 dark:text-blue-300">contato@exemplo.com</a> com uma descrição do seu feedback e, se possível, passos para reproduzir qualquer problema.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Abrir uma issue</h2>
        <p className="text-gray-900 dark:text-gray-200">A forma preferida de reportar bugs ou solicitar recursos é abrir uma issue no repositório. Inclua título claro, passos para reproduzir e screenshots (se aplicável).</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Formulário rápido</h2>
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Obrigado pelo feedback! (Formulário temporário)'); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nome</label>
            <input type="text" name="name" className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input type="email" name="email" className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="seu@exemplo.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mensagem</label>
            <textarea name="message" rows={5} className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="Descreva o problema ou sugestão"></textarea>
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">Enviar</button>
          </div>
        </form>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Contato alternativo</h2>
        <p className="text-gray-900 dark:text-gray-200">Se preferir, veja os contatos dos autores em <Link to="/integrantes" className="text-blue-600 dark:text-blue-300">Integrantes</Link>.</p>
      </section>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">Voltar para a <Link to="/" className="text-blue-600 dark:text-blue-300">Home</Link> ou ver <Link to="/faq" className="text-blue-600 dark:text-blue-300">FAQ</Link></p>
    </div>
  );
}
