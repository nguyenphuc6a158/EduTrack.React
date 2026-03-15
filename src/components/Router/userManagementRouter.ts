import React from "react";

const userManagementRouter = [
	{
		key: '/userInformation',
		path: "/userInformation",
		permissions: '',
		component: React.lazy(() => import("../../scenes/UserManagement/informationUser"))
	},
	{
		key: '/settingAccount',
		path: "/settingAccount",
		permissions: '',
		component: React.lazy(() => import("../../scenes/Dashboard"))
	},
	{
		label: 'Đăng xuất',
		key: '/logout',
		path: "/login",
		component: React.lazy(() => import("../../scenes/Dashboard"))
	}
]
export default userManagementRouter;