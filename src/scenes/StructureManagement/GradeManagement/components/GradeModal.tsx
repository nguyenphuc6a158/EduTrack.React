import React, { useEffect } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { requiredRule, duplicateNameValidator } from "src/lib/validation";
import { GradeDto } from "src/services/services_autogen";

interface GradeModalProps {
    visible: boolean;
    editingGrade: GradeDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
    confirmLoading: boolean;
    listGrades?: GradeDto[];
}

const GradeModal: React.FC<GradeModalProps> = ({ visible, editingGrade, onOk, onCancel, confirmLoading, listGrades = [] }) => {
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
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="gradeName"
                    label="Tên khối lớp"
                    rules={[
                        requiredRule("tên khối lớp"),
                        duplicateNameValidator(listGrades, "Tên khối lớp", editingGrade?.id, "gradeName")
                    ]}
                >
                    <Input placeholder="Ví dụ: Khối 10" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GradeModal;