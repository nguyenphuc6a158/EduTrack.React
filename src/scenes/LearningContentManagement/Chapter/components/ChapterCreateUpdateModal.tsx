import { Form, Input, Modal, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { requiredRule } from "src/lib/validation";
import { ChapterDto, type SubjectDto } from "src/services/services_autogen";

interface IChapterCreateUpdateModalProps {
	open: boolean;
	onCancel: () => void;
	onOk: (value: any) => void;
	selectedChapter: ChapterDto | null;
	listSubject: SubjectDto[];
};
const ChapterCreateUpdateModal: React.FC<IChapterCreateUpdateModalProps> = ({open, selectedChapter, onCancel, onOk, listSubject}) => {
	const [form] = Form.useForm();
	useEffect(()=>{
		if(selectedChapter != null && selectedChapter.id != undefined){
			form.setFieldsValue({
				...selectedChapter
			})
		}else{
			form.resetFields
		}
	},[selectedChapter]);

	const optionSubject =  useMemo(()=>{
		return listSubject.map(item=>{
			return{
				label: item.subjectName || "",
				value: item.id,
			}
		})
	},[listSubject]);

	const handleOk = async () => {
		try{
			const value = await form.validateFields();
			onOk(value);
		} catch (error){
			console.log(error)
		}
	}

	return(
		<Modal
			title={selectedChapter? "Sửa tên chương" : "Tạo mới chương"}
			open={open}
			onCancel={onCancel}
			onOk={handleOk}
			forceRender
		>
			<Form form={form}>
				<Form.Item name="chapterName" label="Tên chương" rules={[requiredRule("Tên chương")]}>
					<Input placeholder="Nhập tển chương"/>
				</Form.Item>
				<Form.Item name="subjectId" label="Thuộc môn" rules={[requiredRule("Môn học")]}>
					<Select options={optionSubject}/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default ChapterCreateUpdateModal