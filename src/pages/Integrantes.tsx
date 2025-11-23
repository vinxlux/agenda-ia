import React from 'react';
import mathausImg from '../assets/imagens/mathaus.svg';
import carlosImg from '../assets/imagens/carlos.svg';
import viniciusImg from '../assets/imagens/vinicius.svg';

type Member = {
  name: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
  photo?: string;
};

const members: Member[] = [
  {
    name: 'Mathaus Victor Souza',
    rm: '564146',
    turma: '1TDSPJ',
    github: '#',
    linkedin: '#',
    photo: mathausImg,
  },
  {
    name: 'Carlos Alberto Guedes',
    rm: '566022',
    turma: '1TDSPJ',
    github: '#',
    linkedin: '#',
    photo: carlosImg,
  },
  {
    name: 'Vinícius L. E. M. Garcia',
    rm: '563340',
    turma: '1TDSPJ',
    github: '#',
    linkedin: '#',
    photo: viniciusImg,
  },
];

export default function Integrantes() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">Integrantes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((m) => (
          <article key={m.rm} className="p-4 border rounded bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex gap-4 items-center">
              <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-md object-cover" />
              <div className="">
                <div className="font-semibold text-slate-900 dark:text-slate-100">{m.name}</div>
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
