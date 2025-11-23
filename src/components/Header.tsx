import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // close on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold text-slate-900 dark:text-slate-100">Agenda IA</div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-4">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-slate-700 dark:text-slate-300'}>Início</NavLink>
            <NavLink to="/integrantes" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-slate-700 dark:text-slate-300'}>Integrantes</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-slate-700 dark:text-slate-300'}>Sobre</NavLink>
            <NavLink to="/faq" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-slate-700 dark:text-slate-300'}>FAQ</NavLink>
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-300 dark:focus:ring-amber-500"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {/* mobile menu button */}
          <button
            className="sm:hidden ml-2 p-2 rounded bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {open && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2">
            <NavLink onClick={() => setOpen(false)} to="/" className={({ isActive }) => isActive ? 'text-blue-600 font-medium px-2 py-2 rounded' : 'text-slate-700 dark:text-slate-300 px-2 py-2 rounded'}>Início</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/integrantes" className={({ isActive }) => isActive ? 'text-blue-600 font-medium px-2 py-2 rounded' : 'text-slate-700 dark:text-slate-300 px-2 py-2 rounded'}>Integrantes</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={({ isActive }) => isActive ? 'text-blue-600 font-medium px-2 py-2 rounded' : 'text-slate-700 dark:text-slate-300 px-2 py-2 rounded'}>Sobre</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/faq" className={({ isActive }) => isActive ? 'text-blue-600 font-medium px-2 py-2 rounded' : 'text-slate-700 dark:text-slate-300 px-2 py-2 rounded'}>FAQ</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
