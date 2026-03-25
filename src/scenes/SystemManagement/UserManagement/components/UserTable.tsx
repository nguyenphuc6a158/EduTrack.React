import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { UserDto } from "src/services/services_autogen";
import { EditOutlined, DeleteOutlined, RedoOutlined } from "@ant-design/icons";
import { formatPhoneNumber } from "src/lib/appconst";

interface UserTableProps {
	users: UserDto[];
	loading: boolean;
	total: number;
	onEdit: (user: UserDto) => void;
	onDelete: (id: number) => void;
	onResetPassWord: (user: UserDto) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, total, onEdit, onDelete, onResetPassWord }) => {
	const columns = [
		{
			title: "Tên đăng nhập",
			dataIndex: "userName",
			key: "userName",
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
			filterSearch: true,
			filters:  [...new Set(users?.flatMap(user => user.phoneNumber || []))].map(item=>({
				text: item,
				value: item,
			})),
			onFilter: (value: any, record: UserDto) => record.phoneNumber?.includes(value as string) || false,
			render: (phoneNumber: string) => (
				<>
					{formatPhoneNumber(phoneNumber)}
				</>
			),
		},
		{
			title: "Vai trò",
			dataIndex: "roleNames",
			key: "roleNames",
			filters:  [...new Set(users?.flatMap(user => user.roleNames || []))].map(item=>({
				text: item,
				value: item,
			})),
			filterSearch: true,
			onFilter: (value: any, record: UserDto) => record.roleNames?.includes(value as string) || false,
			render: (roleNames: string[]) => (
				<>
					{roleNames?.map((role, index) => (
					<Tag color="blue" key={index}>
						{role}
					</Tag>
					))}
				</>
			),
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
			align: "center" as const,
			render: (_: any, record: UserDto) => (
				record.userName === 'admin' ? null : (
					<Space size="middle">
						<Button
							title="Chỉnh sửa"
							type="text"
							icon={<EditOutlined />}
							onClick={() => onEdit(record)}
						/>
						<Button
							title="Lấy lại mật khẩu"
							type="text"
							icon={<RedoOutlined />}
							onClick={() => onResetPassWord(record)}
						/>
						<Popconfirm
							title="Xóa người dùng?"
							description="Bạn có chắc chắn muốn xóa người dùng này không?"
							onConfirm={() => onDelete(record.id)}
							okText="Xóa"
							cancelText="Hủy"
						>
							<Button
								title="Xóa người dùng"
								type="text"
								danger
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</Space>
				)
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
