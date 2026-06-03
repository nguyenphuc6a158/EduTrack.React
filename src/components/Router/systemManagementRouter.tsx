import { FormOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { AppConsts } from "src/lib/appconst";

export const systemManagementRouter = [
	{
		key: "4",
		label: "Quản lý hệ thống",
		path: "/system-management",
		icon: <SettingOutlined />,
		permissions: [AppConsts.Permission.Pages_Users_Create, AppConsts.Permission.Pages_Users_Update, AppConsts.Permission.Pages_Users_Delete, AppConsts.Permission.Pages_Roles_Create, AppConsts.Permission.Pages_Roles_Update, AppConsts.Permission.Pages_Roles_Delete],
		children: [
			{
				key: "4.1",
				label: "Quản lý người dùng",
				path: "/user-management",
				icon: <UserOutlined />,
				permissions: [AppConsts.Permission.Pages_Users_Create, AppConsts.Permission.Pages_Users_Update, AppConsts.Permission.Pages_Users_Delete],
				component: React.lazy(() => import("src/scenes/SystemManagement/UserManagement")),
			},
			{
				key: "4.3",
				label: "Quản lý vai trò",
				path: "/role-management",
				icon: <FormOutlined />,
				permissions: [AppConsts.Permission.Pages_Roles_Create, AppConsts.Permission.Pages_Roles_Update, AppConsts.Permission.Pages_Roles_Delete],
				component: React.lazy(() => import("src/scenes/SystemManagement/RoleManagement")),
			},
			// {
			// 	key: "3.3",
			// 	label: "Quản lý tenants",
			// 	path: "/tenant-management",
			// 	icon: <BookOutlined />,
			// 	permissions: [AppConsts.Permission.Pages_Tenants],
			// 	component: React.lazy(() => import("src/scenes/SystemManagement/TenantManagement")),
			// },

		],
	}
]