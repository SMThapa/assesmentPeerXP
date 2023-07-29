import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
// import { StateProvider } from './context/StateContext';
import { StateProvider } from "./context/StateContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>
);
