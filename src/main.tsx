import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import AppContextProvider from './providers/app/AppContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>,
);
