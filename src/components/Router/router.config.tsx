import { BookOutlined, HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
export interface IMenuItem {
	key: string;
	title: string;
	path: string;
	icon: React.ReactNode;
	permissions: string;
	component: React.LazyExoticComponent<React.ComponentType<any>>;
}
export const menuItems: IMenuItem[] = [
	{
		key: "/",
		title: "Trang chủ",
		path: "/",
		icon: <HomeOutlined />,
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "/classManagement",
		title: "Quản lý lớp học",
		path: "/classManagement",
		icon: <SettingOutlined />,
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/ClassManagement")),
	},
	{
		key: "/assignAssignments",
		title: "Giao bài tập",
		path: "/assignAssignments",
		icon: <BookOutlined />,
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "/userManagement",
		title: "Người dùng",
		path: "/userManagement",
		icon: <UserOutlined />,
		permissions: 'admin',
		component: React.lazy(() => import("../../scenes/UserManagement")),
	},
];
export default menuItems;