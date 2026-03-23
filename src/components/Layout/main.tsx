import { Content } from 'antd/es/layout/layout';
import type { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import { ThemeLayout } from 'src/lib/enumconst';
import { useSettings } from 'src/stores/settingStore';

const Main = () => {
    const { themeStretch, themeLayout, multiTab } = useSettings();

    const mainStyle: CSSProperties = {
        paddingTop: 0,
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: '100%',
    };

    return (
        <Content style={mainStyle} className="flex">
            <div className="flex-grow overflow-auto size-full">
                <div
                    className={
                        `m-auto size-full flex-grow ${themeLayout === ThemeLayout.Horizontal ? 'flex-col' : 'flex-row'}`
                    }
                >
                    <Outlet />
                </div>
            </div>
        </Content>
    );
};

export default Main;
