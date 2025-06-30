import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

function App() {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://ron22hp.app.n8n.cloud/webhook/f54cb8ca-4510-4727-8142-45bc0a2906d9/chat', 
      mode: 'window', 
      defaultLanguage: 'es',
      initialMessages: [
        '👋 ¡Hola! ¿Deseas reservar una cita médica?',
      ],
      i18n: {
        es: {
          title: 'Asistente del Centro Médico Pedro P. Diaz',
          subtitle: 'Chatea con nosotros para agendar tu cita.',
          getStarted: 'Nueva conversación',
          inputPlaceholder: 'Escribe aquí tu mensaje...',
        }
      }
    });
  }, []); 

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
