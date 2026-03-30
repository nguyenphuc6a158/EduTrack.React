import React, { useEffect, useMemo } from "react";
import { Modal, Form, Select } from "antd";
import { requiredRule } from "src/lib/validation";
import type { StudentClassDto, ClassDto, UserDto } from "src/services/services_autogen";

interface IStudentModalProps {
	visible: boolean;
	editingItem: StudentClassDto | null;
	onOk: (values: Record<string, unknown>) => void;
	onCancel: () => void;
	confirmLoading: boolean;
	listClasses?: ClassDto[];
	listStudents?: UserDto[];
}

const StudentModal: React.FC<IStudentModalProps> = ({ 
	visible, 
	editingItem, 
	onOk, 
	onCancel, 
	confirmLoading,
	listClasses = [],
	listStudents = []
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (visible) {
			if (editingItem) {
				form.setFieldsValue({
					classId: editingItem.classId,
					studentId: editingItem.studentId
				});
			} else {
				form.resetFields();
			}
		}
	}, [visible, editingItem, form]);

	const classOptions = useMemo(() => {
		return listClasses.map(item => ({
			label: item.className || `Lớp #${item.id}`,
			value: item.id
		}));
	}, [listClasses]);

	const studentOptions = useMemo(() => {
        return listStudents.map(item => ({
            label: item.fullName || `Học sinh #${item.id}`,
            value: item.id
        }));
    }, [listStudents]);

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
			title={editingItem ? "Chỉnh sửa học sinh lớp" : "Thêm mới học sinh vào lớp"}
			open={visible}
			onOk={handleOk}
			onCancel={onCancel}
			confirmLoading={confirmLoading}
			width={600}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					name="classId"
					label="Chọn lớp học"
					rules={[requiredRule("Vui lòng chọn lớp học")]}
				>
					<Select 
						placeholder="Chọn lớp học" 
						options={classOptions}
						disabled={!!editingItem}
					/>
				</Form.Item>

				<Form.Item
					name="studentId"
					label="Tên học sinh"
					rules={[requiredRule("Vui lòng chọn học sinh")]}
				>
					<Select 
						placeholder="Gõ tên học sinh để tìm kiếm"
						options={studentOptions}
						disabled={!!editingItem}
						showSearch
						filterOption={(input, option) =>
							(option?.label as string)?.toLowerCase().includes(input.toLowerCase())
						}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default StudentModal;
