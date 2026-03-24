import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useUsers, useUserActions, useUserTotal, useUserLoading, useRolesFromUser } from "src/stores/userStore";
import { CreateUserDto, UserDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

const UserManagement = () => {
	const users = useUsers();
	const userActions = useUserActions();
	const total = useUserTotal();
	const loading = useUserLoading();
	const roles = useRolesFromUser()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<UserDto | null>(null);
	const fetchUsers = async () => {
		try {
			await userActions.getAll(undefined, undefined, undefined, 0, 100);
			await userActions.getRoles();
		} catch (error) {
			message.error("Failed to fetch users");
			console.error(error);
		}
	};
	
	useEffect(() => {
		fetchUsers();
	}, []);

	const openAddModal = () => {
		setEditingUser(null);
		setIsModalOpen(true);
	};

	const openEditModal = (user: UserDto) => {
		setEditingUser(user);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: number) => {
		try {
			await userActions.delete(id);
			message.success("Xóa người dùng thành công");
		} catch (error) {
			message.error("Xóa người dùng thất bại");
		}
	};

	const handleOk = async (values: any) => {
		try {
			console.log(values.roleNames)
			if (editingUser) {
				const updateData = new UserDto({
					...editingUser,
					...values,
					roleNames: values.roleNames
				});
				await userActions.update(updateData);
				message.success("Sửa thông tin người dùng thành công");
			} else {
				const createData = new CreateUserDto({
					...values,
					isActive: values.isActive ?? true,
					roleNames: values.roleNames,
				});
				await userActions.create(createData);
				message.success("Tạo mới tài khoản thành công");
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
					<p className="text-gray-500">Thêm sửa xóa và gán vai trò cho người dùng</p>
				</div>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={openAddModal}
					size="large"
				>
					Thêm người dùng
				</Button>
			</div>

			<UserTable
				users={users}
				loading={loading}
				total={total}
				onEdit={openEditModal}
				onDelete={handleDelete}
			/>

			<UserModal
				roles={roles}
				open={isModalOpen}
				editingUser={editingUser}
				onOk={handleOk}
				onCancel={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default UserManagement;
