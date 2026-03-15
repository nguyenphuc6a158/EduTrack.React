import { AreaChartOutlined, ProductOutlined, ReadOutlined, SettingOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];
const itemsMenuLayout: MenuItem[] = [
	{
		key: "/",
		label: <Link to="/">Số liệu</Link>,
		icon: <AreaChartOutlined />
	},
	{
		key: "/classManagement",
		label: <Link to="/classManagement">Quản lý lớp học</Link>,
		icon: <ProductOutlined />
	},
	{
		key: "/assignAssignments",
		label: <Link to="/assignAssignments">Giao bài tập</Link>,
		icon: <ReadOutlined />
	},
	{
		key: "system",
		label: "Quản lý hệ thống",
		icon: <SettingOutlined />,
		children: [
			{
				key: "/userManagement",
				label: <Link to="/userManagement">Người dùng</Link>,
				icon: <UserOutlined />
			},
			{
				key: "/role",
				label: <Link to="/role">Vai trò</Link>,
				icon: <TagsOutlined />
			}
		],
	},
]
export default itemsMenuLayout