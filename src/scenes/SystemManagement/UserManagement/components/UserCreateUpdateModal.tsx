import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch, Select } from "antd";
import { RoleDto, UserDto } from "src/services/services_autogen";
import { requiredRule, emailRule } from "src/lib/validation";

interface UserCreateUpdateModalProps {
    open: boolean;
    editingUser: UserDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
    roles: RoleDto[];
}

const UserCreateUpdateModal: React.FC<UserCreateUpdateModalProps> = ({ open, editingUser, onOk, onCancel, roles }) => {
    const [form] = Form.useForm();
    const [optionRoles, setOptionRoles] = useState<{ label: string, value: string }[]>([]);
    useEffect(() => {
        const optionRoles = roles.map((itemRole) => ({
            label: itemRole.displayName,
            value: itemRole.normalizedName ?? "",
        }))
        setOptionRoles(optionRoles);
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
            title={editingUser ? "Sửa thông tin người dùng" : "Thêm mới người dùng"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={editingUser ? "Sửa" : "Thêm"}
            width={600}
        >
            <Form form={form} layout="vertical" initialValues={{ isActive: true }}>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="userName"
                        label="Tên tài khoản"
                        rules={[requiredRule("Tên tài khoản")]}
                    >
                        <Input placeholder="Nhập tên tài khoản" />
                    </Form.Item>
                    <Form.Item
                        name="emailAddress"
                        label="Email"
                        rules={[requiredRule("Email"), emailRule]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="name"
                        label="Họ"
                        rules={[requiredRule("Họ")]}
                    >
                        <Input placeholder="Nhập họ" />
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Tên"
                        rules={[requiredRule("Tên")]}
                    >
                        <Input placeholder="Nhập tên" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        rules={[requiredRule("Số điện thoại")]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[requiredRule("Mật khẩu")]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="roleNames"
                        label="Vai trò của tài khoản"
                        rules={[requiredRule("Vai trò của tài khoản")]}
                    >
                        <Select 
                            options={optionRoles}
                            placeholder="Nhập tên tài khoản" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="isActive"
                        label="Kích hoạt"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default UserCreateUpdateModal;
