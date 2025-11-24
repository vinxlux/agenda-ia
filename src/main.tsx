import TarefasPage from './pages/Tarefas';
import AuthPage from './pages/Auth';
import React from 'react'
import "./styles/index.css";
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
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
        { path: 'auth', element: <AuthPage /> },
        { path: 'tarefas', element: <TarefasPage /> },
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

// ./mvnw quarkus:dev
