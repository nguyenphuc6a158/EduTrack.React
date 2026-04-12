import { DatePicker, Form, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import type { AssignmentDto, ClassAssignmentDto, ClassDto } from "src/services/services_autogen";

interface IEditClassAssignmentModalProps {
	open: boolean;
	onCancel: () => void;
	onOk: (values: ClassAssignmentDto) => void;
	selectedClassAssignment: ClassAssignmentDto | null;
	listAssignments: AssignmentDto[];
	listClasses: ClassDto[];
}
const EditClassAssignmentModal: React.FC<IEditClassAssignmentModalProps> = ({ open, onCancel, onOk, selectedClassAssignment, listAssignments, listClasses }) => {
	const [form] = Form.useForm();
	useEffect(() => {
		if (selectedClassAssignment) {
			form.setFieldsValue({
				classId: selectedClassAssignment.classId,
				assignmentId: selectedClassAssignment.assignmentId,
				publicTime: dayjs(selectedClassAssignment.publicTime),
			});
		}
	}, [selectedClassAssignment]);

	const handleOk = async () => {
		try {
			const values: ClassAssignmentDto = await form.validateFields();
			console.log("Validated values:", values);
			onOk(values);
		} catch (error) {
			console.error("Validation failed:", error);
		}
	}
	const optionsAssignments = useMemo(() => {
		return listAssignments.map(item => {
			return ({
				label: item.title || "",
				value: item.id,
			})
		})
	}, [listAssignments]);
	const optionsClasses = useMemo(() => {
		return listClasses.map(item => {
			return ({
				label: item.className || "",
				value: item.id,
			})
		})
	}, [listClasses]);
	return(
		<Modal
			title="Chỉnh sửa bài tập đã giao"
			open={open}
			onCancel={onCancel}
			onOk={handleOk}
		>
			<Form form={form} layout="vertical">
				<Form.Item label="Lớp học" name="classId">
					<Select options={optionsClasses} />
				</Form.Item>
				<Form.Item label="Bài tập" name="assignmentId">
					<Select options={optionsAssignments} />
				</Form.Item>
				<Form.Item label="Xuất bản vào lúc" name="publicTime">
					<DatePicker
						showTime
						format="DD/MM/YYYY HH:mm:ss A"
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default EditClassAssignmentModal;