import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useRoles, useRoleActions, useRoleLoading } from "src/stores/roleStore";
import { CreateRoleDto, RoleDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import RoleTable from "./components/RoleTable";
import RoleModal from "./components/RoleModal";

const RoleManagement = () => {
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
            message.success("Role deleted successfully");
        } catch (error) {
            message.error("Failed to delete role");
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
                message.success("Role updated successfully");
            } else {
                const createData = new CreateRoleDto({
                    ...values,
                    grantedPermissions: values.grantedPermissions || [],
                });
                await actions.create(createData);
                message.success("Role created successfully");
            }
            await actions.getAll();
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
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

            <RoleModal 
                open={isModalOpen}
                editingRole={editingRole}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default RoleManagement;
