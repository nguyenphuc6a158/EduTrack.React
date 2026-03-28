import { BookOutlined, FormOutlined, HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import React from "react";
import { AppConsts } from "src/lib/appconst";
import { systemManagementRouter } from "./systemManagementRouter";
import { learningContentManagementRouter } from "./learningContentManagementRouter";
import classManagementRouter from "./classManagementRouter";

export type IMenuItem = {
	key: string;
	icon?: React.ReactNode;
	label: React.ReactNode;
	path?: string;
	permissions: string[] | string;
	showInMenu?: boolean;
	component?: React.LazyExoticComponent<React.ComponentType<any>>;
	children?: IMenuItem[];
};

export const routers: IMenuItem[] = [
	{
		key: "1",
		label: "Trang chủ",
		path: "/",
		icon: <HomeOutlined />,
		permissions: '',
		component: React.lazy(() => import("src/scenes/Dashboard")),
	},
	...classManagementRouter,
	...learningContentManagementRouter,
	...systemManagementRouter,
	{
		key: "3",
		label: "Profile",
		path: "/profile",
		icon: <UserOutlined />,
		permissions: '',
		showInMenu: false,
		component: React.lazy(() => import("src/scenes/Account/Profile")),
	},
	
];
export default routers;