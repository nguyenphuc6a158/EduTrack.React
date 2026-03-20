import React from "react"

const classManagermentRouter = [
	{
		key: "classManagement",
		path: "/classManagement",
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/ClassManagement/ClassManagement")),
	},
	{
		key: "levelManagement",
		path: "/levelManagement",
		permissions: 'teacher',
		component: React.lazy(() => import("../../scenes/ClassManagement/LevelManagement")),
	},
]
export default classManagermentRouter