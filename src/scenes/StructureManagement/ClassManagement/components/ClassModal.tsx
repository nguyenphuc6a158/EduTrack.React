import React, { useEffect, useMemo, useState } from "react";
import { Modal, Form, Input, Select, Row, Col, Switch } from "antd";
import { requiredRule, duplicateNameValidator } from "src/lib/validation";
import type { ClassDto, GradeDto, UserDto } from "src/services/services_autogen";

interface IClassModalProps {
    visible: boolean;
    editingItem: ClassDto | null;
    onOk: (values: any) => void;
    onCancel: () => void;
    confirmLoading: boolean;
    listGrades: GradeDto[];
    listTeachers: UserDto[];
    listClasses?: ClassDto[];
}

const ClassModal: React.FC<IClassModalProps> = ({ visible, editingItem, onOk, onCancel, confirmLoading, listGrades, listTeachers, listClasses = [] }) => {
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
    }, [editingItem]);

    const optionTeachers = useMemo(()=>{
        return listTeachers.map(item=>{
            return({
                label: item.fullName || "",
                value: item.id,
            })
        });
    },[listTeachers])

    const opntionGrades = useMemo(()=>{
        return listGrades.map(grade => {
            return ({ 
                label: grade.gradeName, 
                value: grade.id 
            })
        })
    },[listGrades])

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
            width={600}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="className" 
                    label="Tên lớp học"
                    rules={[
                        requiredRule("tên lớp học"),
                        duplicateNameValidator(listClasses, "Tên lớp học", editingItem?.id)
                    ]}
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
                            <Select 
                                options={opntionGrades} 
                                placeholder="Chọn khối học" 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="teacherId" 
                            label="Giáo viên"
                            rules={[requiredRule("Vui lòng chọn giáo viên")]}
                        >
                            <Select 
                                options={optionTeachers}
                                placeholder="Chọn giáo viên dạy lớp học này"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ClassModal;