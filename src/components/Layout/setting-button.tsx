import {
    CloseOutlined,
    LeftOutlined,
    QuestionCircleOutlined,
    RightOutlined,
    SettingFilled,
    SettingOutlined,
    SunOutlined,
    MoonOutlined,
    SettingTwoTone,
    SunFilled,
    MoonFilled
} from '@ant-design/icons';
import { Button, Card, Drawer, Slider, Switch, Tooltip } from 'antd';
import { type CSSProperties, useState } from 'react';

import { useSettingActions, useSettings } from 'src/stores/settingStore';
import { ThemeMode, type ThemeColorPresets, type ThemeLayout } from 'src/lib/enumconst';
import { useTheme } from 'src/ThemeProvider';
import { ResponsiveLayout } from 'src/lib/appconst';

/**
 * App Setting
 */
export default function SettingButton() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const settings = useSettings();
    const {
        themeMode,
        themeColorPresets,
        themeLayout,
        themeStretch,
        breadCrumb,
        multiTab,
        darkSidebar,
        fontSize,
        fontFamily,
    } = settings;
    const { setSettings } = useSettingActions();

    const setThemeMode = (themeMode: ThemeMode) => {
        setSettings({
            ...settings,
            themeMode,
        });
    };

    const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
        setSettings({
            ...settings,
            themeColorPresets,
        });
    };

    const setThemeLayout = (themeLayout: ThemeLayout) => {
        setSettings({
            ...settings,
            themeLayout,
        });
    };

    const setThemeStretch = (themeStretch: boolean) => {
        setSettings({
            ...settings,
            themeStretch,
        });
    };

    const setBreadCrumn = (checked: boolean) => {
        setSettings({
            ...settings,
            breadCrumb: checked,
        });
    };

    const setMultiTab = (checked: boolean) => {
        setSettings({
            ...settings,
            multiTab: checked,
        });
    };

    const setDarkSidebar = (checked: boolean) => {
        setSettings({
            ...settings,
            darkSidebar: checked,
        });
    };

    const setFontFamily = (fontFamily: string) => {
        setSettings({
            ...settings,
            fontFamily,
        });
    };

    const setFontSize = (fontSize: number) => {
        setSettings({
            ...settings,
            fontSize,
        });
    };

    const style: CSSProperties = {
        backdropFilter: 'blur(20px)',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'right top, left bottom',
        backgroundSize: '50, 50%',
    };

    // const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
    // const toggleFullScreen = () => {
    //     if (screenfull.isEnabled) {
    //         screenfull.toggle();
    //         setIsFullscreen(!isFullscreen);
    //     }
    // };

    // const layoutBackground = (layout: ThemeLayout) =>
    //     themeLayout === layout
    //         ? `linear-gradient(135deg, ${themeVars.colors.background.neutral} 0%, ${themeVars.colors.palette.primary.default} 100%)`
    //         : themeVars.colors.palette.gray[500];

    return (
        <>
            <div className="flex items-center justify-center">
                <div
                    onClick={() => setDrawerOpen(true)}
                    className="cursor-pointer text-xl"
                >
                    <SettingTwoTone />
                </div>
            </div>
            <Drawer
                placement="right"
                title="Settings"
                width={ResponsiveLayout.drawerWidth}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                closable={false}
                styles={{
                    body: { padding: 0 },
                    mask: { backgroundColor: 'transparent' },
                }}
                style={style}
                extra={
                    <CloseOutlined onClick={() => setDrawerOpen(false)} className="text-gray-400" />
                }
            >
                <div className="flex flex-col gap-6 p-6">
                    {/* theme mode */}
                    <div>
                        <div className="mb-3 text-base font-semibold text-text-secondary">Mode</div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card
                                onClick={() => setThemeMode(ThemeMode.Light)}
                                className={`flex h-24 cursor-pointer flex-col items-center justify-center transition-all
                                    ${themeMode === ThemeMode.Light
                                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                        : 'hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                                    <SunFilled
                                        className={`text-2xl ${themeMode === ThemeMode.Light ? 'text-yellow-500' : 'text-gray-400'}`}
                                    />
                                </div>
                                <span
                                    className={`mt-2 text-xs font-medium ${themeMode === ThemeMode.Light ? 'text-primary' : 'text-gray-500'}`}
                                >
                                    Light
                                </span>
                            </Card>

                            <Card
                                onClick={() => setThemeMode(ThemeMode.Dark)}
                                className={`flex h-24 cursor-pointer flex-col items-center justify-center transition-all
                                    ${themeMode === ThemeMode.Dark
                                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                        : 'hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100">
                                    <MoonFilled
                                        className={`text-2xl ${themeMode === ThemeMode.Dark ? 'text-indigo-500' : 'text-gray-400'}`}
                                    />
                                </div>
                                <span
                                    className={`mt-2 text-xs font-medium ${themeMode === ThemeMode.Dark ? 'text-primary' : 'text-gray-500'}`}
                                >
                                    Dark
                                </span>
                            </Card>
                        </div>
                    </div>

                </div>
            </Drawer>
        </>
    );
}
