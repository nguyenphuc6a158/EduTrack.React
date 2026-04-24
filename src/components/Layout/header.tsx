import { Drawer } from 'antd';
import { type CSSProperties, useState } from 'react';

import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';
import SettingButton from './setting-button';
import AccountPopover from './AccountPopover';

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const headerStyle: CSSProperties = {
        borderBottom: '',
        width: '100%',
    };

    return (
        <>
            <header
                className={'sticky top-0 right-0 left-auto'}
                style={headerStyle}
            >
                <div
                    className="flex items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
                    style={{
                        height: HEADER_HEIGHT,
                        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    }}
                >
                    <div className="flex items-baseline">

                        <div className="ml-4 hidden md:block">
                            {/* {breadCrumb ? <BreadCrumb /> : null} */}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <SettingButton />
                        <AccountPopover />
                    </div>
                </div>
            </header>
        </>
    );
}
