import { useEffect } from 'react';
import { Router } from 'src/components/Router';
import { useTheme } from './ThemeProvider';
import { Button } from 'antd';

function App() {

  useEffect(() => {
    const checkToken = () => {
      if (window.location.pathname !== '/login' && !window.abp.session.userId) {
        window.location.replace('/login');
      }
    };

    window.addEventListener('storage', checkToken);
    const interval = setInterval(checkToken, 5000);
    return () => {
      window.removeEventListener('storage', checkToken);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Router />
    </div>
  );
}

export default App;