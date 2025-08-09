import React from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import RouterConfig from './config/router.config';
import { AuthProvider } from './context/auth.context';
import { Provider } from "react-redux";
import { store } from './config/store.config';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);  
