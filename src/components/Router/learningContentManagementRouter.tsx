import { BlockOutlined, BookOutlined, ExperimentOutlined } from "@ant-design/icons";
import React from "react";
import { AppConsts } from "src/lib/appconst";

export const learningContentManagementRouter = [
	{
		key: "3",
		label: "Nội dung học",
		path: "/learningContent-management",
		icon: <BookOutlined />,
		permissions: [AppConsts.Permission.Pages_Subjects, AppConsts.Permission.Pages_Chapters],
		children: [
			{
				key: "3.1",
				label: "Chương",
				path: "/chapter",
				icon: <BlockOutlined />,
				permissions: [AppConsts.Permission.Pages_Chapters],
				component: React.lazy(() => import("src/scenes/LearningContentManagement/Chapter")),
			},			
			{
				key: "3.2",
				label: "Môn học",
				path: "/subject",
				icon: <ExperimentOutlined />,
				permissions: [AppConsts.Permission.Pages_Subjects],
				component: React.lazy(() => import("src/scenes/LearningContentManagement/Subject")),
			},
		],
	}
]