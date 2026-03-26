import React, { useEffect } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { requiredRule } from "src/lib/validation";
import { GradeDto } from "src/services/services_autogen";

interface GradeModalProps {
    visible: boolean;
    editingGrade: GradeDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
    confirmLoading: boolean;
}

const GradeModal: React.FC<GradeModalProps> = ({ visible, editingGrade, onOk, onCancel, confirmLoading }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingGrade) {
                form.setFieldsValue({
                    ...editingGrade, 
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingGrade, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onOk(values);
        } catch (error) {
            //
        }
    };

    return (
        <Modal
            title={editingGrade ? "Chỉnh sửa khối lớp" : "Thêm mới khối lớp"}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="gradeName"
                    label="Tên khối lớp"
                    rules={[requiredRule("Vui lòng nhập tên khối lớp")]}
                >
                    <Input placeholder="Ví dụ: Khối 10" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GradeModal;