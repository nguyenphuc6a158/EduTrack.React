import React from "react";
import userManagementRouter from "./userManagementRouter";

export const routerConfig = [
	{
		key: "Dashboard",
		path: "/",
		permissions: 'Dashboard',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "classManagement",
		path: "/classManagement",
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/ClassManagement")),
	},
	{
		key: "assignAssignments",
		path: "/assignAssignments",
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "userManagement",
		path: "/userManagement",
		permissions: 'admin',
		component: React.lazy(() => import("../../scenes/UserManagement")),
	},
	{
		key: "role",
		path: "/role",
		permissions: 'admin',
		component: React.lazy(() => import("../../scenes/Role")),
	},
	...userManagementRouter
];
export default routerConfig;