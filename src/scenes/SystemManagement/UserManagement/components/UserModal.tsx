import React, { useEffect } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { UserDto } from "src/services/services_autogen";
import { requiredRule, emailRule } from "src/lib/validation";

interface UserModalProps {
    open: boolean;
    editingUser: UserDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, editingUser, onOk, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingUser) {
                form.setFieldsValue({
                    ...editingUser,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, editingUser, form]);

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
            title={editingUser ? "Edit User" : "Add New User"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={editingUser ? "Update" : "Create"}
            width={600}
        >
            <Form form={form} layout="vertical" initialValues={{ isActive: true }}>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="userName"
                        label="User Name"
                        rules={[requiredRule("User Name")]}
                    >
                        <Input placeholder="e.g. johndoe" />
                    </Form.Item>
                    <Form.Item
                        name="emailAddress"
                        label="Email Address"
                        rules={[requiredRule("Email"), emailRule]}
                    >
                        <Input placeholder="e.g. john@example.com" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="name"
                        label="First Name"
                        rules={[requiredRule("First Name")]}
                    >
                        <Input placeholder="e.g. John" />
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Last Name"
                        rules={[requiredRule("Last Name")]}
                    >
                        <Input placeholder="e.g. Doe" />
                    </Form.Item>
                </div>

                {!editingUser && (
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[requiredRule("Password")]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
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

export default UserModal;
