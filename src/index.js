import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Footer from './component/Footer';
import LanguageSelector from './component/LanguageSelector';
import './index.css';
import './component/utils/i18n'; 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div className='body'>
    <div className="language-controls-top">
      <LanguageSelector />
    </div>
    <App />
    <Footer/>
  </div>
)