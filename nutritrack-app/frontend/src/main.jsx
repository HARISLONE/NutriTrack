import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import Tailwind first, then custom styles
import './styles/tailwind.css';
import './index.css';
import './styles/button.css';
import './styles/Modal.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
