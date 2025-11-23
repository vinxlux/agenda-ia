import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AgendaProvider } from '../contexts/AgendaContext';

export default function Layout() {
  return (
    <AgendaProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Header />
        <main className="max-w-5xl mx-auto mt-6 px-4">
          <Outlet />
        </main>
      </div>
    </AgendaProvider>
  );
}
