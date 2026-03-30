import { Form, Input, Modal, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { requiredRule } from "src/lib/validation";
import { ChapterDto, QuestionDto } from "src/services/services_autogen";

interface IQuestionModalProps {
	onOk: (value: any) => void;
	open: boolean;
	selectedQuestion: QuestionDto | null
	onCancel: () => void;
	listChapter: ChapterDto[];
};
const QuestionModal: React.FC<IQuestionModalProps> = ({onOk, open, selectedQuestion, onCancel, listChapter}) => {
	const [form] = Form.useForm();
	useEffect(()=>{
		
	},[]);
	
	const optionChapters =  useMemo(()=>{
		return listChapter.map(item=>{
			return{
				label: item.chapterName || "",
				value: item.id,
			}
		})
	},[listChapter]);
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
			title={selectedQuestion? "Sửa tên chương" : "Tạo mới chương"}
			open={open}
			onCancel={onCancel}
			onOk={handleOk}
			forceRender
		>
			<Form form={form}>
				<Form.Item name="Content" label="Nội dung câu hỏi" rules={[requiredRule("Nội dung câu hỏi")]}>
					<Input placeholder="Nhập nội dung câu hỏi"/>
				</Form.Item>
				<Form.Item name="chapterId" label="Thuộc chương" rules={[requiredRule("Chương")]}>
					<Select options={optionChapters}/>
				</Form.Item>
				<Form.Item name="difficultyLevel" label="Độ khó" rules={[requiredRule("Chương")]}>
					<Input placeholder="Nhập nội dung câu hỏi"/>
				</Form.Item>
				<Form.Item name="Explanation" label="Đáp án" rules={[requiredRule("Đáp án")]}>
					<Input placeholder="Nhập đáp án"/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default QuestionModal