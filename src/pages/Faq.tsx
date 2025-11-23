import React from 'react';
import { Link } from 'react-router-dom';

export default function Faq() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">FAQ — Perguntas Frequentes</h1>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">O que é este app?</h2>
        <p className="text-gray-900 dark:text-gray-200">É uma agenda semanal com integração de IA que ajuda a criar, organizar e sugerir tarefas a partir de texto livre. Você pode inserir comandos estruturados ou descrições em linguagem natural; a IA interpreta e sugere entradas.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Como adiciono tarefas?</h2>
        <p className="text-gray-900 dark:text-gray-200">Escreva instruções no campo principal usando formatos como:</p>
        <ul className="list-disc ml-6 text-gray-900 dark:text-gray-200">
          <li><code>segunda 09:00 - Academia</code> — adiciona uma tarefa na segunda às 09:00.</li>
          <li><code>adicionar terça 19:00 - Jantar</code> — comando explícito de adicionar.</li>
          <li>Textos livres: <code>organizar reunião com o time na quarta à tarde</code> — a IA tenta extrair dia e horário.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Como a IA funciona aqui?</h2>
        <p className="text-gray-900 dark:text-gray-200">A IA analisa o texto inserido e sugere tarefas, horários e categorias. As sugestões aparecem separadas das entradas já confirmadas; você pode revisar, editar ou aceitar as sugestões antes de salvar.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Onde os dados são armazenados?</h2>
        <p className="text-gray-900 dark:text-gray-200">Os dados são salvos localmente no navegador usando IndexedDB (via Dexie). Não enviamos suas tarefas para servidores externos por padrão — verifique a seção de privacidade para exceções (por exemplo, chamadas à API de IA se estiverem ativadas).</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Privacidade e segurança</h2>
        <p className="text-gray-900 dark:text-gray-200">Por padrão, tudo permanece no seu dispositivo. Se você usar funcionalidades que chamam serviços de IA externos, trechos de texto poderão ser enviados para essas APIs. Evite enviar informações sensíveis. Consulte o código em <code>src/services/ia.ts</code> para ver onde ocorrem as chamadas.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Sincronização e exportação</h2>
        <p className="text-gray-900 dark:text-gray-200">Atualmente não há sincronização automática com a nuvem. Recomendamos exportar sua agenda manualmente (se houver opção no app) para backup. Você também pode copiar/colar os dados do IndexedDB usando ferramentas do navegador.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Resolução de problemas</h2>
        <ul className="list-disc ml-6 text-gray-900 dark:text-gray-200">
          <li>Se a IA não identificar um horário, tente ser mais explícito: <code>quinta 14:30 - Entrevista</code>.</li>
          <li>Se dados não aparecem após recarregar, verifique o console do navegador por erros relacionados ao IndexedDB.</li>
          <li>Para bugs, abra uma issue no repositório ou contate os desenvolvedores listados na página "Integrantes".</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Atalhos e dicas</h2>
        <p className="text-gray-900 dark:text-gray-200">Separe instruções usando vírgula ou ponto-e-vírgula para criar múltiplas tarefas em uma única entrada. Exemplos: <code>segunda 9:00 reunião, entregar relatório 18:00</code>.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Acessibilidade</h2>
        <p className="text-gray-900 dark:text-gray-200">O app procura ser acessível: os campos têm foco navegável com teclado e a estrutura é linear para leitores de tela. Se você usar tecnologias assistivas e encontrar problemas, por favor relate na página de Integrantes ou abra uma issue.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Personalização e temas</h2>
        <p className="text-gray-900 dark:text-gray-200">É possível personalizar cores de tarefas usando comandos como <code>corindice</code> e <code>cortexto</code>. O app também suporta tema escuro claro (detectado pelo sistema ou via toggle, se disponível). Para alterar cores persistentes, verifique a implementação em <code>src/contexts/ThemeContext.tsx</code>.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Exportar e importar</h2>
        <p className="text-gray-900 dark:text-gray-200">Para backup, exporte seus dados em formato JSON (se a funcionalidade existir) ou use as ferramentas do navegador para salvar o conteúdo do IndexedDB. Ao importar, espere um JSON com estrutura similar a: <code>{'{"dia":[{"hora":"09:00","texto":"Tarefa"}]}'}</code> — adapte conforme necessário.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Offline / PWA</h2>
        <p className="text-gray-900 dark:text-gray-200">A aplicação salva tudo localmente, então muitas funções básicas funcionam offline. Se o projeto tiver um service worker (PWA), ele suportará cache das páginas estáticas; verifique a configuração de build para confirmar.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Idiomas</h2>
        <p className="text-gray-900 dark:text-gray-200">A interface atual está em português. A IA pode entender e sugerir tarefas em outros idiomas dependendo do modelo/configuração; resultados podem variar.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Custos e limites da IA</h2>
        <p className="text-gray-900 dark:text-gray-200">Se você ativar integração com APIs de IA externas, essas chamadas podem gerar custos conforme o provedor. O app não cobra diretamente, mas usar chaves de API públicas/privadas e limites de uso pode implicar custos para quem fornece a conta da API.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Perguntas técnicas</h2>
        <ul className="list-disc ml-6 text-gray-900 dark:text-gray-200">
          <li>Local do código da IA: <code>src/services/ia.ts</code>.</li>
          <li>Banco de dados local: <code>src/services/database.ts</code> (IndexedDB / Dexie).</li>
          <li>Contexto de tema: <code>src/contexts/ThemeContext.tsx</code>.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50">Contato e feedback</h2>
        <p className="text-gray-900 dark:text-gray-200">Encontrou um bug, tem sugestão ou quer colaborar? Abra uma issue no repositório ou veja os contatos na página <Link to="/integrantes" className="text-blue-600 dark:text-blue-300">Integrantes</Link>.</p>
      </section>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">Voltar para a <Link to="/" className="text-blue-600 dark:text-blue-300">Home</Link> ou ver <Link to="/about" className="text-blue-600 dark:text-blue-300">Sobre</Link></p>
    </div>
  );
}
