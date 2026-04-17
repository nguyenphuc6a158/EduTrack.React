import { ApartmentOutlined, BookOutlined, BuildOutlined, EditOutlined, UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import React from "react";

const homeWorkRouter = [
	{
		key: "5",
		label: "Bài tập",
		path: "/home-work",
		icon: <EditOutlined />,
		permissions: '',
		children: [
			{
				key: "5.1",
				label: "Danh sách bài tập",
				path: "/home-work/do-assignment",
				permissions: '',
				icon: <UnorderedListOutlined />,
				component: React.lazy(() => import("src/scenes/Assignment/ListAssignment")),
			},
		],
		
	},
	{
		key: "5.2",
		label: "Chi tiết bài tập",
		path: "/detail-assignment",
		permissions: '',
		showInMenu: false,
		component: React.lazy(() => import("src/scenes/Assignment/DetailAssignment")),
	},
]
export default homeWorkRouter