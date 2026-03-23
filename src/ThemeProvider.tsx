import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useSettings } from './stores/settingStore';
import { AppConsts } from './lib/appconst';
import { ThemeMode } from './lib/enumconst';

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { themeMode } = useSettings();
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(ThemeMode.Light, ThemeMode.Dark);
    root.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === ThemeMode.Dark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorBgLayout: 'var(--color-layout)',
          colorBgElevated: 'var(--color-layout)',
          colorPrimary: AppConsts.COLOR_PRIMARY,
        },
        components: {
          Layout: {
            headerBg: 'var(--color-header)',
            siderBg: 'var(--color-layout)',
          },
          Menu: {
            itemBg: 'var(--color-layout)',
            subMenuItemBg: 'var(--color-layout)',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};