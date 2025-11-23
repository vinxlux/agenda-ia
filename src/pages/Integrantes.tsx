import React from 'react';
import MathausJpg from '../assets/imagens/Mathaus.jpg';
import CarlosJpg from '../assets/imagens/Carlos.jpg';
import ViniciusJpg from '../assets/imagens/Vinicius.jpg';

type Integrante = {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
};

const integrantes: Integrante[] = [
  {
    nome: 'Mathaus Victor Souza',
    rm: '564146',
    turma: '1TDSPJ',
    foto: MathausJpg,
    github: 'https://github.com/Mathausz',
    linkedin: 'https://www.linkedin.com/in/mathaus-marcelino-677baa331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  {
    nome: 'Carlos Alberto Guedes',
    rm: '566022',
    turma: '1TDSPJ',
    foto: CarlosJpg,
    github: 'https://github.com/carlosguedesneto',
    linkedin: 'https://www.linkedin.com/in/carlos-alberto-13782a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  {
    nome: 'Vinícius L. E. M. Garcia',
    rm: '563340',
    turma: '1TDSPJ',
    foto: ViniciusJpg,
    github: 'https://github.com/vinxlux',
    linkedin: 'https://linkedin.com/in/vinícius-luis-90ba05309',
  },
];

export default function Integrantes() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">Integrantes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrantes.map((m) => (
          <article key={m.rm} className="p-4 border rounded bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex gap-4 items-center">
              <img src={m.foto} alt={m.nome} className="w-20 h-20 rounded-md object-cover" />
              <div className="">
                <div className="font-semibold text-slate-900 dark:text-slate-100">{m.nome}</div>
                <div className="text-slate-700 dark:text-slate-300">RM: {m.rm}</div>
                <div className="text-slate-700 dark:text-slate-300">Turma: {m.turma}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-4">
              <a className="text-blue-600 dark:text-blue-400" href={m.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="text-blue-600 dark:text-blue-400" href={m.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Se os links de GitHub/LinkedIn estiverem pendentes, substitua os '#' pelos URLs reais dos integrantes.</p>
    </section>
  );
}
