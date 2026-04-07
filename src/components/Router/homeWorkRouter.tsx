import { ApartmentOutlined, BookOutlined, BuildOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
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
				label: "Làm bài tập",
				path: "/home-work/do-assignment",
				permissions: '',
				icon: <EditOutlined />,
				component: React.lazy(() => import("src/scenes/HomeWork/DoAssignment")),
			},
		],
	},
]
export default homeWorkRouter