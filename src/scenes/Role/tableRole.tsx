import { Button, Table } from "antd";
import React from "react";
import type { RoleDto } from "../../services/services_autogen";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
interface ITableRole {
	listRole: RoleDto[];
	openFormCreateOrUpdateUser: () => void;
}
export default class TableRole extends React.Component<ITableRole>{
	render(): React.ReactNode {
		const {listRole, openFormCreateOrUpdateUser} = this.props
		const columns = [
			{
				title: "Tên vai trò",
				key: "name",
				dataIndex: "name",
			},
			{
				title: "Tên hiển thị",
				key:"displayName",
				dataIndex: "displayName",
			},
			{
				title: "Mô tả",
				key:"description",
				dataIndex: "description",
			},
			{
				title: "Hành động",
				width: '200px',
				render: () => 
					<>
						<Button type="primary" onClick={openFormCreateOrUpdateUser}><EditOutlined /></Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="dashed" ><DeleteOutlined /></Button>
					</>
			}
		]
		return(

			<Table 
				dataSource={listRole}
				columns={columns}
				rowKey="roleManagement"
				pagination={false}
			/>
		)
	}
}