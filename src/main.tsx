import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import { initializeDatabase } from './services/database';
import Faq from './pages/Faq';
import Home from './pages/Home';
import Integrantes from './pages/Integrantes';
import About from './pages/About';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import TarefaPage from './pages/Tarefa';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';

// Use createBrowserRouter + RouterProvider and opt-in to the v7 relative splat path behavior
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
        children: [
        { index: true, element: <App /> },
        { path: 'integrantes', element: <Integrantes /> },
        { path: 'about', element: <About /> },
        { path: 'contato', element: <Contact /> },
        { path: 'faq', element: <Faq /> },
        { path: 'tarefa/:id', element: <TarefaPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    future: { v7_relativeSplatPath: true },
  }
);

(async () => {
  // Inicializar o banco de dados
  await initializeDatabase();

  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
})();
