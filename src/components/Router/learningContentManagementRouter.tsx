import { BlockOutlined, BookOutlined, ExperimentOutlined, QuestionCircleOutlined, ReadOutlined } from "@ant-design/icons";
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
				key: "3.4",
				label: "Ngân hàng câu hỏi",
				path: "/questions",
				icon: <QuestionCircleOutlined />,
				permissions: [AppConsts.Permission.Pages_QuestionOptions],
				component: React.lazy(() => import("src/scenes/LearningContentManagement/Question")),
			},
			{
				key: "3.3",
				label: "Bài tập",
				path: "/assignment",
				icon: <ReadOutlined />,
				permissions: [AppConsts.Permission.Pages_Assignments],
				component: React.lazy(() => import("src/scenes/LearningContentManagement/Assignment")),
			},
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