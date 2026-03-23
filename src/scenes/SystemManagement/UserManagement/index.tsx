import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useUsers, useUserActions, useUserTotal, useUserLoading } from "src/stores/userStore";
import { CreateUserDto, UserDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

const UserManagement = () => {
    const users = useUsers();
    const actions = useUserActions();
    const total = useUserTotal();
    const loading = useUserLoading();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserDto | null>(null);

    const fetchUsers = async () => {
        try {
            await actions.getAll(undefined, undefined, undefined, 0, 100);
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
            await actions.delete(id);
            message.success("User deleted successfully");
        } catch (error) {
            message.error("Failed to delete user");
        }
    };

    const handleOk = async (values: any) => {
        try {
            if (editingUser) {
                const updateData = new UserDto({
                    ...editingUser,
                    ...values,
                });
                await actions.update(updateData);
                message.success("User updated successfully");
            } else {
                const createData = new CreateUserDto({
                    ...values,
                    isActive: values.isActive ?? true,
                    roleNames: [],
                });
                await actions.create(createData);
                message.success("User created successfully");
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
                    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                    <p className="text-gray-500">Manage your system users and their permissions.</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openAddModal}
                    size="large"
                >
                    Add User
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
                open={isModalOpen}
                editingUser={editingUser}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default UserManagement;
