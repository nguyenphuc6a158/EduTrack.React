import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useUsers, useUserActions, useUserTotal, useUserLoading, useRolesFromUser } from "src/stores/userStore";
import { CreateUserDto, ResetPasswordDto, UserDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import UserTable from "./components/UserTable";
import UserCreateUpdateModal from "./components/UserCreateUpdateModal";
import UserResetPasswordModal from "./components/UserResetModal";

const UserManagement = () => {
	const users = useUsers();
	const userActions = useUserActions();
	const total = useUserTotal();
	const loading = useUserLoading();
	const roles = useRolesFromUser()
	const [isCreateUpdateModalOpen, setIsCreateUpdateModalOpen] = useState(false);
	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
	const fetchUsers = async () => {
		try {
			await userActions.getAll(undefined, undefined, undefined, 0, 100);
			await userActions.getRoles();
		} catch (error) {
			message.error("Lấy danh sách người dùng thất bại");
			console.error(error);
		}
	};
	
	useEffect(() => {
		fetchUsers();
	}, []);

	const openAddModal = () => {
		setSelectedUser(null);
		setIsCreateUpdateModalOpen(true);
	};

	const openEditModal = (user: UserDto) => {
		setSelectedUser(user);
		setIsCreateUpdateModalOpen(true);
	};

	const handleDelete = async (id: number) => {
		try {
			await userActions.delete(id);
			message.success("Xóa người dùng thành công");
		} catch (error) {
			message.error("Xóa người dùng thất bại");
		}
	};
	const openResetPasswordModal = (user: UserDto) => {
		setSelectedUser(user);
		setIsResetPasswordModalOpen(true);
	};
	const handelResetPassword = async (value: any) => {
		let item: ResetPasswordDto = new ResetPasswordDto();
		if(selectedUser){
			item.userId = selectedUser.id;
			item.newPassword = value.newPassword;
			item.adminPassword = value.adminPassword;
		}
		await userActions.resetPassword(item);
		message.success("Lấy lại mật khẩu mới thành công")
		setIsResetPasswordModalOpen(false);
	} 
	const handleOk = async (values: any) => {
		try {
			console.log(values.roleNames)
			if (selectedUser) {
				const updateData = new UserDto({
					...selectedUser,
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
			setIsCreateUpdateModalOpen(false);
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
				onResetPassWord={openResetPasswordModal}
				onDelete={handleDelete}
			/>

			<UserCreateUpdateModal
				roles={roles}
				open={isCreateUpdateModalOpen}
				editingUser={selectedUser}
				onOk={handleOk}
				onCancel={() => setIsCreateUpdateModalOpen(false)}
			/>
			<UserResetPasswordModal
				onOk={handelResetPassword}
				onCancel={()=>setIsResetPasswordModalOpen(false)}
				open={isResetPasswordModalOpen}
			/>
		</div>
	);
};

export default UserManagement;
