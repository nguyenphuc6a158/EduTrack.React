import React from "react";
import userManagementRouter from "./userManagementRouter";
import classManagermentRouter from "./classManagermentRouter";

export const routerConfig = [
	{
		key: "Dashboard",
		path: "/",
		permissions: 'Dashboard',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "assignAssignments",
		path: "/assignAssignments",
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "role",
		path: "/role",
		permissions: 'admin',
		component: React.lazy(() => import("../../scenes/Role")),
	},
	...classManagermentRouter,
	...userManagementRouter,
	
];
export default routerConfig;