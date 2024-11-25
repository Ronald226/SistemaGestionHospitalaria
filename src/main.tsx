import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar JS (opcional, solo si usas componentes interactivos como modales o tooltips)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
