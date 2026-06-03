import { ApartmentOutlined, BookOutlined, BuildOutlined, EditOutlined, UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import React from "react";
import { AppConsts } from "src/lib/appconst";

const homeWorkRouter = [
	{
		key: "5",
		label: "Bài tập",
		path: "/home-work",
		icon: <EditOutlined />,
		permissions: [AppConsts.Permission.Pages_StudentAnswers_Create, AppConsts.Permission.Pages_StudentAnswers_Update, AppConsts.Permission.Pages_StudentAnswers_Delete],
		component: React.lazy(() => import("src/scenes/Assignment/ListAssignment")),
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