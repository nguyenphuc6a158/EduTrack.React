import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import abpUserConfigurationService from 'src/services/abpUserConfigurationService';
import 'src/lib/abp.js';
import Utils from 'src/utils/utils';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';

abpUserConfigurationService.getAll().then(data => {
  Utils.extend(true, window.abp, data.data.result);

  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
});