import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Row, Col, Switch } from "antd";
import { requiredRule } from "src/lib/validation";
import type { ClassDto, GradeDto } from "src/services/services_autogen";

interface IClassModalProps {
    visible: boolean;
    editingItem: ClassDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
    confirmLoading: boolean;
    listGrades: GradeDto[];
}

const ClassModal = ({ visible, editingItem, onOk, onCancel, confirmLoading, listGrades }: IClassModalProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingItem) {
                form.setFieldsValue({
                    ...editingItem,
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingItem, form]);

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
            title={editingItem ? "Chỉnh sửa lớp học" : "Thêm mới lớp học"}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            destroyOnClose 
            width={600}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="className" 
                    label="Tên lớp học"
                    rules={[requiredRule("Vui lòng nhập tên lớp học")]}
                >
                    <Input placeholder="Ví dụ: 10A1" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gradeId" 
                            label="Khối lớp"
                            rules={[requiredRule("Vui lòng chọn khối lớp")]}
                        >
                            <Select options={listGrades.map((grade) => ({ label: grade.gradeName, value: grade.id }))} placeholder="Chọn khối">
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="teacherId" 
                            label="Giáo viên"
                            rules={[requiredRule("Vui lòng chọn giáo viên")]}
                        >
                            <Input placeholder="Nhập tên giáo viên" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item 
                    name="isActive" 
                    label="Trạng thái" 
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClassModal;