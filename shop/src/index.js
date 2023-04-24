import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <HashRouter> 
        <App />
     </HashRouter>
    </UserContextProvider>
  </React.StrictMode>
);