import { Form, Input, Modal } from "antd";
import type React from "react";
import { useEffect } from "react";
import { requiredRule } from "src/lib/validation";
import type { SubjectDto } from "src/services/services_autogen";
interface ISubjectCreateUpdateModalProps {
	selectedSubject: SubjectDto|null;
	open: boolean;
	handleOk: (value: any) => void;
	onCancel: () => void;
};
const SubjectCreateUpdateModal: React.FC<ISubjectCreateUpdateModalProps> = ({open, onCancel, selectedSubject, handleOk}) => {
	const [form] = Form.useForm();
	useEffect(()=>{
		if (!open) return;
		if(!selectedSubject){
			form.resetFields();
			console.log("reset form")
		} else{
			form.setFieldValue('subjectName', selectedSubject.subjectName)
		}
	},[open])
	const onOk = async () => {
		try {
			const values = await form.validateFields();
			handleOk(values)
		} catch(error){

		}
	}
	return(
		<Modal
			title={selectedSubject? "Sửa tên môn học" : "Tạo mới môn học"}
			open={open}
			onCancel={onCancel}
			onOk={onOk}
			forceRender
		>
			<Form form={form}>
				<Form.Item name="subjectName" label="Tên môn học" rules={[requiredRule("Tên môn học")]}>
					<Input placeholder="Nhập tển môn học"/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default SubjectCreateUpdateModal