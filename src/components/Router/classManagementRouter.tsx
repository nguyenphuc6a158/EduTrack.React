import { ApartmentOutlined, BookOutlined, BuildOutlined } from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import React from "react";

const classManagementRouter = [
	{
 		key: "2",
  		label: "Quản lý lớp học",
 		path: "/class-management",
  		icon: <BookOutlined />,
 		permissions: '',
  		children: [
    	
		{
      		key: "2.1",
      		label: "Quản lý lớp học",
      		path: "/class-management/class-list",
      		permissions: '',
			icon: <ApartmentOutlined />,
      		component: React.lazy(() => import("src/scenes/StructureManagement/ClassManagement")),
    	},
    	{
      		key: "2.2",
      		label: "Quản lý khối học",
      		path: "/class-management/structure-management",
     		permissions: '',
			icon: <BuildOutlined />,
      		component: React.lazy(() => import("src/scenes/StructureManagement/GradeManagement")),
   	 	},
    	
  		],
	},
]
export default classManagementRouter