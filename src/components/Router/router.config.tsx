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
<<<<<<< HEAD
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
	{
		key: "4",
		label: "System Management",
		path: "/system-management",
		icon: <SettingOutlined />,
		permissions: [AppConsts.Permission.Pages_Users, AppConsts.Permission.Pages_Roles, AppConsts.Permission.Pages_Tenants],
		children: [
			{
				key: "4.1",
				label: "User Management",
				path: "/user-management",
				icon: <UserOutlined />,
				permissions: [AppConsts.Permission.Pages_Users],
				component: React.lazy(() => import("src/scenes/SystemManagement/UserManagement")),
			},
			{
				key: "4.2",
				label: "Quản lý vai trò",
				path: "/role-management",
				icon: <FormOutlined />,
				permissions: [AppConsts.Permission.Pages_Roles],
				component: React.lazy(() => import("src/scenes/SystemManagement/RoleManagement")),
			},
			{
				key: "4.3",
				label: "Quản lý tenants",
				path: "/tenant-management",
				icon: <BookOutlined />,
				permissions: [AppConsts.Permission.Pages_Tenants],
				component: React.lazy(() => import("src/scenes/SystemManagement/TenantManagement")),
			},

		],
	},
=======
	...learningContentManagement,
	...systemManagementRouter,
>>>>>>> feb11b46a64e58e0b471f49f4f067cf603450e78
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