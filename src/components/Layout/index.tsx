import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Layout, Menu } from "antd";
import React, { Suspense, useEffect, useMemo, type CSSProperties } from "react";
import menuItems, { type IMenuItem } from "../Router/router.config";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import utils from "../../utils/utils";
import { Footer } from "antd/es/layout/layout";
import { useTheme } from "src/ThemeProvider";
import NavLogo from "./nav-logo";
import NavVertical from "./nav-vertical";
import Header from "./header";
import Main from "./main";
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from "./config";
import { ThemeLayout } from "src/lib/enumconst";
import { useSettings } from "src/stores/settingStore";
import { useSessionActions } from 'src/stores/sessionStore';

export const MainLayout = () => {
	const { getCurrentLoginInformations } = useSessionActions();

	useEffect(() => {
		getCurrentLoginInformations();
	}, []);

	const [closeSider, setCloseSider] = React.useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { themeLayout } = useSettings();

	const { selectedKey, openKeys } = React.useMemo(() => utils.findKeysByPath(pathname, menuItems), [pathname]);
	const [openMenuKeys, setOpenMenuKeys] = React.useState<string[]>([]);




	React.useEffect(() => {
		document.title = utils.getPageTitle(pathname);
		setOpenMenuKeys(openKeys);
	}, [pathname, openKeys]);

	const onOpenChange = (keys: string[]) => {
		setOpenMenuKeys(keys);
	};

	const findPathByKey = (key: string, list: IMenuItem[]): string | null => {
		for (const item of list) {
			if (item.key === key) return item.path || '';
			if (item.children) {
				const found = findPathByKey(key, item.children);
				if (found !== null) return found;
			}
		}
		return null;
	};

	const layoutClassName = useMemo(() => {
		return `flex h-screen overflow-hidden ${themeLayout === ThemeLayout.Horizontal ? 'flex-col' : 'flex-row'}`;
	}, [themeLayout]);

	const secondLayoutStyle: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		paddingLeft: themeLayout === ThemeLayout.Horizontal
			? 0
			: themeLayout === ThemeLayout.Mini
				? NAV_COLLAPSED_WIDTH
				: NAV_WIDTH,
	};

	return (
		<Layout className={layoutClassName}>
			<Suspense >
				<Layout style={secondLayoutStyle}>
					<Header />
					<NavVertical closeSideBarDrawer={() => setCloseSider(false)} />
					<Main />
				</Layout>
			</Suspense>
		</Layout>
	);
};