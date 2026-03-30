import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import abpUserConfigurationService from 'src/services/abpUserConfigurationService';
import 'src/lib/abp.js';
import Utils from 'src/utils/utils';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import MyApp from './App.tsx';

abpUserConfigurationService.getAll().then(data => {
  Utils.extend(true, window.abp, data.data.result);

  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider>
        <ConfigProvider locale={viVN}>
          <MyApp />
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
});