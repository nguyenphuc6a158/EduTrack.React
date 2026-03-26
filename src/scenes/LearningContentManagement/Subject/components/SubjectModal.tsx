import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import type React from "react";
import { useEffect } from "react";
import { requiredRule } from "src/lib/validation";
import type { SubjectDto } from "src/services/services_autogen";
interface ISubjectModalProps {
	selectedSubject: SubjectDto|null;
	open: boolean;
	handleOk: (value: any) => void;
	onCancel: () => void;
};
const SubjectModal: React.FC<ISubjectModalProps> = ({open, onCancel, selectedSubject, handleOk}) => {
	const [form] = useForm();
	useEffect(()=>{
		if(selectedSubject==null){
			form.resetFields()
		} else{
			form.setFieldValue('subjectName', selectedSubject.subjectName)
		}
	},[selectedSubject])
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
		>
			<Form form={form}>
				<Form.Item name="subjectName" label="Tên môn học" rules={[requiredRule("Tên môn học")]}>
					<Input placeholder="Nhập tển môn học"/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default SubjectModal