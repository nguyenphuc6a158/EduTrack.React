import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Row, Col } from "antd";
import { useRolePermissions, useRoleActions, useRoles } from "src/stores/roleStore";
import { duplicateNameValidator, requiredRule } from "src/lib/validation";
import { colResponsive, ResponsiveLayout, ResponsiveSpacing } from "src/lib/appconst";

interface RoleCreateUpdateModalProps {
    open: boolean;
    editingRole: any | null;
    onOk: (values: any) => void;
    onCancel: () => void;
}

const RoleCreateUpdateModal: React.FC<RoleCreateUpdateModalProps> = ({ open, editingRole, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const permissions = useRolePermissions();
    const listRoles = useRoles();
    const { getAllPermissions, getRoleForEdit } = useRoleActions();

    useEffect(() => {
        if (open) {
            getAllPermissions();
            if (editingRole) {
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
            title={editingRole ? "Sửa vai trò" : "Thêm mới vai trò"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={editingRole ? "Sửa" : "Thêm"}
            width={ResponsiveLayout.modalWidth.xl}
        >
            <Form form={form} layout="vertical">
                <Row gutter={ResponsiveSpacing.rowGutter}>
                    <Col {...colResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            name="name"
                            label="Tên vai trò"
                            rules={[
                                requiredRule("Tên vai trò"),
                                duplicateNameValidator(listRoles, "Tên vai trò", editingRole?.id, "name")
                            ]}
                        >
                            <Input placeholder="Nhập tên vai trò" />
                        </Form.Item>
                    </Col>
                    <Col {...colResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            name="displayName"
                            label="Tên hiển thị"
                            rules={[
                                requiredRule("Tên hiển thị")
                            ]}
                        >
                            <Input placeholder="Nhập tên hiển thị" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="description"
                    label="Miêu tả"
                >
                    <Input.TextArea rows={2} placeholder="Nhập miêu tả" />
                </Form.Item>

                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Danh sách quyền</h4>
                    <Form.Item name="grantedPermissions">
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row gutter={[ResponsiveSpacing.rowGutter, ResponsiveSpacing.rowGutter]}>
                                {permissions.map((p) => (
                                    <Col {...colResponsive(24, 12, 8, 8, 8, 8)} key={p.name}>
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

export default RoleCreateUpdateModal;
