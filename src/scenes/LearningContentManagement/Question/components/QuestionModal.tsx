import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import { requiredRule } from "src/lib/validation";
import { ChapterDto, QuestionDto, type FileParameter } from "src/services/services_autogen";
import { useFileActions } from "src/stores/fileStore";

interface IQuestionModalProps {
	onOk: (value: any) => void;
	open: boolean;
	selectedQuestion: QuestionDto | null
	onCancel: () => void;
	listChapter: ChapterDto[];
};
const QuestionModal: React.FC<IQuestionModalProps> = ({onOk, open, selectedQuestion, onCancel, listChapter}) => {
	const [form] = Form.useForm();
	const fileActions = useFileActions();
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
	const optionDifficultyLevel = [
		{
			label: "1 - Nhận biết",
			value: 1,
		},
		{
			label: "2 - Thông hiểu",
			value: 2,
		},
		{
			label: "3 - Vận dụng",
			value: 3,
		},
		{
			label: "4 - Vận dụng cao",
			value: 4,
		},
	]
	const handleOk = async () => {
		try{
			const value = await form.validateFields();
			const fileExplanation = value.explanation?.[0]?.originFileObj;
			const fileContent = value.content?.[0]?.originFileObj;
			if (!fileExplanation || !fileContent) {
				throw new Error("Không có file");
			}
			const fileParamExplanation: FileParameter = {
					data: fileExplanation,
					fileName: fileExplanation.name,
				}
			const fileUrlExplanation = await fileActions.upload(fileParamExplanation);
			 const fileParamContent: FileParameter = 
				{
					data: fileContent,
					fileName: fileContent.name,
				}
			const fileUrlContent = await fileActions.upload(fileParamContent);
			onOk(
				{
					...value,
					explanation: fileUrlExplanation,
					content: fileUrlContent,
				}
			);
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
				<Form.Item name="chapterId" label="Thuộc chương" rules={[requiredRule("Chương")]}>
					<Select placeholder="Câu hỏi thuộc chương" options={optionChapters}/>
				</Form.Item>
				<Form.Item name="difficultyLevel" label="Độ khó" rules={[requiredRule("Chương")]}>
					<Select placeholder="Độ khó của câu hỏi" options={optionDifficultyLevel}/>
				</Form.Item>
				<Form.Item 
					name="content" 
					label="Đề bài" 
					valuePropName="fileList"
					getValueFromEvent={(e: any) => {
						if (Array.isArray(e)) return e;
						return e?.fileList;
					}}
					rules={[requiredRule("Đề bài")]}
				>
					<Upload beforeUpload={() => false} maxCount={1}>
						<Button icon={<UploadOutlined />}>Chọn file</Button>
					</Upload>
				</Form.Item>
				<Form.Item
					name="explanation"
					label="Đáp án"
					valuePropName="fileList"
					getValueFromEvent={(e: any) => {
						if (Array.isArray(e)) return e;
						return e?.fileList;
					}}
					rules={[requiredRule("Đáp án")]}
				>
					<Upload beforeUpload={() => false} maxCount={1}>
						<Button icon={<UploadOutlined />}>Chọn file</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default QuestionModal