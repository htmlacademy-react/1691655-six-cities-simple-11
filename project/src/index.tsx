import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';


const Settings = {
  offersNumber: 5,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offersNumber={Settings.offersNumber}
    />
  </React.StrictMode>,
);
