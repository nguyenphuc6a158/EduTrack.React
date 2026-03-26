import { BookOutlined, FormOutlined, HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import React from "react";
import { AppConsts } from "src/lib/appconst";
import { systemManagementRouter } from "./systemManagementRouter";
import { learningContentManagement } from "./learningContentManagement";

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
	{
 		key: "2",
  		label: "Quản lý lớp học",
 		path: "/class-management",
  		icon: <BookOutlined />,
 		permissions: '',
  		children: [
    	
		{
      		key: "2.1",
      		label: "Quản lý lớp học",
      		path: "/class-management/class-list",
      		permissions: '',
      		component: React.lazy(() => import("src/scenes/StructureManagement/ClassManagement")),
    	},
    	{
      		key: "2.2",
      		label: "Quản lý khối học",
      		path: "/class-management/structure-management",
     		permissions: '',
      		component: React.lazy(() => import("src/scenes/StructureManagement/GradeManagement")),
   	 	},
    	
  		],
	},
	...learningContentManagement,
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