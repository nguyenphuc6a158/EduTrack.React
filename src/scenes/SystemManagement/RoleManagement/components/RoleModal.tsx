import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Row, Col } from "antd";
import { useRolePermissions, useRoleActions } from "src/stores/roleStore";
import { requiredRule } from "src/lib/validation";

interface RoleModalProps {
    open: boolean;
    editingRole: any | null;
    onOk: (values: any) => void;
    onCancel: () => void;
}

const RoleModal: React.FC<RoleModalProps> = ({ open, editingRole, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const permissions = useRolePermissions();
    const { getAllPermissions, getRoleForEdit } = useRoleActions();

    useEffect(() => {
        if (open) {
            getAllPermissions();
            if (editingRole) {
                // Fetch full role details for editing (including permissions)
                getRoleForEdit(editingRole.id).then((result) => {
                    form.setFieldsValue({
                        ...result.role,
                        grantedPermissions: result.grantedPermissionNames,
                    });
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, editingRole, form, getAllPermissions, getRoleForEdit]);

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
            title={editingRole ? "Edit Role" : "Add New Role"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={editingRole ? "Update" : "Create"}
            width={800}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Role Name"
                            rules={[requiredRule("Role Name")]}
                        >
                            <Input placeholder="e.g. Admin" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="displayName"
                            label="Display Name"
                            rules={[requiredRule("Display Name")]}
                        >
                            <Input placeholder="e.g. Administrator" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea rows={2} placeholder="Optional description..." />
                </Form.Item>

                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Permissions</h4>
                    <Form.Item name="grantedPermissions">
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {permissions.map((p) => (
                                    <Col span={8} key={p.name}>
                                        <Checkbox value={p.name}>{p.displayName}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default RoleModal;
