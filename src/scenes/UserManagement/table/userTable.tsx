import { Table } from "antd";
import React from "react";
import type { UserDto } from "../../../services/services_autogen";

interface IUserTableProps {
	listUser: UserDto[];
}

export default class UserManagement extends React.Component<IUserTableProps> {
	render() {
		const { listUser } = this.props;

		const columns = [
			{
				title: "Tên tài khoản",
				dataIndex: "userName",
				key: "userName",
			},
			{
				title: "Họ và tên",
				dataIndex: "fullName",
				key: "fullName",
			},
			{
				title: "Ngày sinh",
				dataIndex: "dateOfBirth",
				key: "dateOfBirth",
			},
			{
				title: "Số điện thoại",
				dataIndex: "phoneNumber",
				key: "phoneNumber",
			},
			{
				title: "Địa chỉ email",
				dataIndex: "emailAddress",
				key: "emailAddress",
			},
			{
				title: "Vai trò",
				dataIndex: "roleNames",
				key: "roleNames",
				render: (roles: string[]) => (
					<>
						{roles?.map((role, index) => (
							<span key={index} style={{ marginRight: 8 }}>
								{role}
							</span>
						))}
					</>
				),
			},
			{
				title: "Hành động",
				key: "actions",
				render: () => <a>Sửa</a>,
			},
		];

		return (
			<Table
				columns={columns}
				dataSource={listUser}
				rowKey="id"
				pagination={false}
			/>
		);
	}
}