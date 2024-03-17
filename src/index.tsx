import React from 'react';
import ReactDOM from 'react-dom/client';
import BasePage from './components/BasePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BasePage />
  </React.StrictMode>
);

