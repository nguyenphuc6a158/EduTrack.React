import { BlockOutlined, BookOutlined, ExperimentOutlined } from "@ant-design/icons";
import React from "react";
import { AppConsts } from "src/lib/appconst";

export const learningContentManagement = [
	{
		key: "2",
		label: "Nội dung học",
		path: "/learningContent-management",
		icon: <BookOutlined />,
		permissions: [AppConsts.Permission.Pages_Subjects, AppConsts.Permission.Pages_Chapters],
		children: [
			{
				key: "2.1",
				label: "Môn học",
				path: "/subject",
				icon: <ExperimentOutlined />,
				permissions: [AppConsts.Permission.Pages_Subjects],
				component: React.lazy(() => import("src/scenes/LearningContentManagement/Subject")),
			},
			{
				key: "2.2",
				label: "Chương",
				path: "/chapter",
				icon: <BlockOutlined />,
				permissions: [AppConsts.Permission.Pages_Chapters],
				component: React.lazy(() => import("src/scenes/LearningContentManagement/Chapter")),
			},
		],
	}
]