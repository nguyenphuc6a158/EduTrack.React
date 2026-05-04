import React, { useEffect, useState } from "react";
import { App, Button, message } from "antd";
import { useTenants, useTenantActions, useTenantTotal, useTenantLoading } from "src/stores/tenantStore";
import { CreateTenantDto, TenantDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import TenantTable from "./components/TenantTable";
import TenantModal from "./components/TenantModal";
import { PageShell } from "src/components/PageShell";

const TenantManagement = () => {
    const { message } = App.useApp();
    const tenants = useTenants();
    const actions = useTenantActions();
    const total = useTenantTotal();
    const loading = useTenantLoading();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTenant, setEditingTenant] = useState<TenantDto | null>(null);

    const fetchTenants = async () => {
        try {
            await actions.getAll(undefined, undefined, undefined, 0, 100);
        } catch (error) {
            message.error("Failed to fetch tenants");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    const openAddModal = () => {
        setEditingTenant(null);
        setIsModalOpen(true);
    };

    const openEditModal = (tenant: TenantDto) => {
        setEditingTenant(tenant);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await actions.delete(id);
            message.success("Tenant deleted successfully");
        } catch (error) {
            message.error("Failed to delete tenant");
        }
    };

    const handleOk = async (values: any) => {
        try {
            if (editingTenant) {
                const updateData = new TenantDto({
                    ...editingTenant,
                    ...values,
                });
                await actions.update(updateData);
                message.success("Tenant updated successfully");
            } else {
                const createData = new CreateTenantDto({
                    ...values,
                    isActive: values.isActive ?? true,
                });
                await actions.create(createData);
                message.success("Tenant created successfully");
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageShell>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Tenant Management</h2>
                    <p className="text-gray-500">Manage system tenants and their settings.</p>
                </div>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={openAddModal}
                    size="large"
                >
                    Add Tenant
                </Button>
            </div>

            <TenantTable 
                tenants={tenants}
                loading={loading}
                total={total}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <TenantModal 
                open={isModalOpen}
                editingTenant={editingTenant}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            />
        </PageShell>
    );
};

export default TenantManagement;
