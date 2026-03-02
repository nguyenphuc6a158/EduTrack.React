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
		key: "1",
		title: "Trang chủ",
		path: "/",
		icon: <HomeOutlined />,
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "2",
		title: "Quản lý lớp học",
		path: "/classManagement",
		icon: <SettingOutlined />,
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/ClassManagement")),
	},
	{
		key: "3",
		title: "Quản lý giáo viên",
		path: "/teacherManagement",
		icon: <UserOutlined />,
		permissions: 'admin',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	},
	{
		key: "4",
		title: "Giao bài tập",
		path: "/assignAssignments",
		icon: <BookOutlined />,
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/Dashboard")),
	}
];
export default menuItems;