import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>

);


