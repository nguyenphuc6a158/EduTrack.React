import { ApartmentOutlined, BookOutlined, BuildOutlined, UserOutlined } from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import React from "react";
import { AppConsts } from "src/lib/appconst";

const classManagementRouter = [
	{
 		key: "2",
  		label: "Quản lý lớp học",
 		path: "/class-management",
  		icon: <BookOutlined />,
 		permissions: AppConsts.Permission.Pages_StudentClasses_Create,
  		children: [
    	

		{
      		key: "2.3",
      		label: "Quản lý học sinh",
      		path: "/class-management/student-management",
     		permissions: AppConsts.Permission.Pages_StudentClasses_Create,
			icon: <UserOutlined />,
      		component: React.lazy(() => import("src/scenes/StructureManagement/StudentManagement")),
   	 	},
		
		{
      		key: "2.1",
      		label: "Quản lý lớp học",
      		path: "/class-management/class-list",
      		permissions: AppConsts.Permission.Pages_Classes_Create,
			icon: <ApartmentOutlined />,
      		component: React.lazy(() => import("src/scenes/StructureManagement/ClassManagement")),
    	},
    	{
      		key: "2.2",
      		label: "Quản lý khối học",
      		path: "/class-management/structure-management",
     		permissions: AppConsts.Permission.Pages_Grades_Create,
			icon: <BuildOutlined />,
      		component: React.lazy(() => import("src/scenes/StructureManagement/GradeManagement")),
   	 	},
    	
    	
  		],
	},
]
export default classManagementRouter