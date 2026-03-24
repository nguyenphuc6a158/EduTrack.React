import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { UserDto } from "src/services/services_autogen";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface UserTableProps {
	users: UserDto[];
	loading: boolean;
	total: number;
	onEdit: (user: UserDto) => void;
	onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, total, onEdit, onDelete }) => {
	const columns = [
		{
			title: "Tên đăng nhập",
			dataIndex: "userName",
			key: "userName",
			sorter: true,
		},
		{
			title: "Họ và tên",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "Email",
			dataIndex: "emailAddress",
			key: "emailAddress",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Hoạt động",
			dataIndex: "isActive",
			key: "isActive",
			render: (isActive: boolean) => (
				<Tag color={isActive ? "green" : "red"}>
					{isActive ? "Cho phép" : "Không cho phép"}
				</Tag>
			),
		},
		{
			title: "Thời điểm tạo",
			dataIndex: "creationTime",
			key: "creationTime",
			render: (date: Date) => (date ? new Date(date).toLocaleString() : "-"),
		},
		{
			title: "Hành động",
			key: "action",
			render: (_: any, record: UserDto) => (
				<Space size="middle">
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => onEdit(record)}
					/>
					<Popconfirm
						title="Xóa người dùng?"
						description="Bạn có chắc chắn muốn xóa người dùng này không?"
						onConfirm={() => onDelete(record.id)}
						okText="Xóa"
						cancelText="Hủy"
					>
						<Button
							type="text"
							danger
							icon={<DeleteOutlined />}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Table
			rowKey="id"
			dataSource={users}
			columns={columns}
			loading={loading}
			pagination={{
				placement: ["topEnd"],
				total: total,
				pageSize: 10,
				showSizeChanger: true,
				showTotal: (total) => `Tổng: ${total}`,
			}}
		/>
	);
};

export default UserTable;
