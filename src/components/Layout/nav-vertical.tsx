import { Layout, Menu } from "antd";
import React, { useMemo } from "react";
const { Header, Content, Sider } = Layout;
import menuItems, { type IMenuItem } from "../Router/router.config";
import { useNavigate, useLocation } from "react-router-dom";
import utils from "../../utils/utils";
import NavLogo from "./nav-logo";
import { NAV_WIDTH } from "./config";
import { useSettingActions, useSettings } from "src/stores/settingStore";
import { ThemeLayout, ThemeMode } from "src/lib/enumconst";
import { isGrantedByPrefix } from "src/lib/abpUtility";


type Props = {
    closeSideBarDrawer?: () => void;
};
export default function NavVertical(props: Props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const filterMenuItems = (items: IMenuItem[]): IMenuItem[] => {
        return items
            .filter((item) => item.showInMenu !== false  && (item.permissions =='' || isGrantedByPrefix(item.permissions)))
            .map((item) => {
                if (item.children) {
                    return {
                        ...item,
                        children: filterMenuItems(item.children),
                    };
                }
                return item;
            });
    };

    const filteredMenuItems = useMemo(() => filterMenuItems(menuItems), []);

    const { selectedKey, openKeys } = React.useMemo(() => utils.findKeysByPath(pathname, menuItems), [pathname]);
    const [openMenuKeys, setOpenMenuKeys] = React.useState<string[]>([]);
    const settings = useSettings();
    const { themeLayout, themeMode, darkSidebar } = settings;
    const { setSettings } = useSettingActions();

    const collapsed = useMemo(
        () => themeLayout === ThemeLayout.Mini,
        [themeLayout]
    );

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

    const handleToggleCollapsed = () => {
        setSettings({
            ...settings,
            themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
        });
    }
    return (
        <Sider
            trigger={null}
            collapsible
            width={NAV_WIDTH}
            collapsed={collapsed}
            className="!fixed left-0 top-0 h-screen"
            style={{
                borderRight: `1px dashed rgba(244,246,248,0.5)`,
            }}
        >
            <NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                openKeys={openMenuKeys}
                onOpenChange={onOpenChange}
                mode="inline"
                style={{ borderInlineEnd: "none" }}
                onClick={(e) => {
                    const path = findPathByKey(e.key, menuItems);
                    if (path) navigate(path);
                }}
                items={filteredMenuItems}
            />
        </Sider>
    );
}
