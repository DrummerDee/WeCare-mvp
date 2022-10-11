import React from 'react';
import Context from './Pages/Context';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context>
    <App />
    </Context>
  </React.StrictMode>
);


