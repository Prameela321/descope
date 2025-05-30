import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from '@descope/react-sdk';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider 
    projectId='P2xmZ6o36U02wn4PDWZ59KoixPcg'
    // baseUrl="http://auth.app.4fiveone.com"
    persistTokens={true} // set to `false` to disable token storage in browser to prevent XSS
    sessionTokenViaCookie={false} // set to `true` to store the session token in a JS cookie instead of localStorage
>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
