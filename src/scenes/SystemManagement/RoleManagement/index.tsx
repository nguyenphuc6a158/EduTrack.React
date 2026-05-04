import React, { useEffect, useState } from "react";
import { App, Button, message } from "antd";
import { useRoles, useRoleActions, useRoleLoading } from "src/stores/roleStore";
import { CreateRoleDto, RoleDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import RoleTable from "./components/RoleTable";
import RoleCreateUpdateModal from "./components/RoleCreateUpdateModal";
import { PageShell } from "src/components/PageShell";

const RoleManagement = () => {
    const { message } = App.useApp();
    const roles = useRoles();
    const actions = useRoleActions();
    const loading = useRoleLoading();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<any | null>(null);

    const fetchRoles = async () => {
        try {
            await actions.getAll();
        } catch (error) {
            message.error("Failed to fetch roles");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const openAddModal = () => {
        setEditingRole(null);
        setIsModalOpen(true);
    };

    const openEditModal = (role: any) => {
        setEditingRole(role);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await actions.delete(id);
            message.success("Xóa vai trò thành công");
        } catch (error) {
            message.error("Xóa vai trò thất bại");
        }
    };

    const handleOk = async (values: any) => {
        try {
            if (editingRole) {
                const updateData = new RoleDto({
                    ...editingRole,
                    ...values,
                });
                await actions.update(updateData);
                message.success("Cập nhật thành công vai trò");
            } else {
                const createData = new CreateRoleDto({
                    ...values,
                    grantedPermissions: values.grantedPermissions || [],
                });
                await actions.create(createData);
                message.success("Thêm mới thành công vai trò");
            }
            await actions.getAll();
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageShell>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Quản lý vai trò</h2>
                    <p className="text-gray-500">Quản lý hệ thống vai trò và phân quyền cho các vai trò.</p>
                </div>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={openAddModal}
                    size="large"
                >
                    Thêm vai trò
                </Button>
            </div>

            <RoleTable 
                roles={roles}
                loading={loading}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <RoleCreateUpdateModal 
                open={isModalOpen}
                editingRole={editingRole}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            />
        </PageShell>
    );
};

export default RoleManagement;
