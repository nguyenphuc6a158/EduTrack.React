import React, { useEffect } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { TenantDto } from "src/services/services_autogen";
import { requiredRule } from "src/lib/validation";

interface TenantModalProps {
    open: boolean;
    editingTenant: TenantDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
}

const TenantModal: React.FC<TenantModalProps> = ({ open, editingTenant, onOk, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingTenant) {
                form.setFieldsValue({
                    ...editingTenant,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, editingTenant, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onOk(values);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    return (
        <Modal
            title={editingTenant ? "Edit Tenant" : "Add New Tenant"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={editingTenant ? "Update" : "Create"}
            width={600}
        >
            <Form form={form} layout="vertical" initialValues={{ isActive: true }}>
                <Form.Item
                    name="tenancyName"
                    label="Tenancy Name"
                    rules={[requiredRule("Tenancy Name")]}
                >
                    <Input placeholder="e.g. default" disabled={!!editingTenant} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[requiredRule("Name")]}
                >
                    <Input placeholder="e.g. Default Tenant" />
                </Form.Item>

                {!editingTenant && (
                    <>
                        <Form.Item
                            name="adminEmailAddress"
                            label="Admin Email Address"
                            rules={[requiredRule("Admin Email")]}
                        >
                            <Input placeholder="admin@example.com" />
                        </Form.Item>
                        <Form.Item
                            name="connectionString"
                            label="Connection String (Optional)"
                        >
                            <Input placeholder="Leave empty to use base database" />
                        </Form.Item>
                    </>
                )}

                <Form.Item
                    name="isActive"
                    label="Active Status"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TenantModal;
