import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>['items'][number];
const itemsMenuProps: MenuItem[] = [
	{
		label: 'Thông tin tài khoản',
		key: '/userInformation',
		icon: <UserOutlined />,
	},
	{
		label: 'Cài đặt',
		key: '/settingAccount',
		icon: <SettingOutlined />,
	},
	{
		label: 'Đăng xuất',
		key: '/logout',
		icon: <LogoutOutlined />,
	}]
export default itemsMenuProps;