import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import { extractRawTextFromFile, parseContentQuestion } from "src/lib/convertToHtml";
import { requiredRule } from "src/lib/validation";
import { ChapterDto, QuestionDto, type FileParameter } from "src/services/services_autogen";
import { useFileActions } from "src/stores/fileStore";

interface IQuestionCreateUpdateModalProps {
	onOk: (value: any) => void;
	open: boolean;
	selectedQuestion: QuestionDto | null
	onCancel: () => void;
	listChapter: ChapterDto[];
};
const QuestionCreateUpdateModal: React.FC<IQuestionCreateUpdateModalProps> = ({ onOk, open, selectedQuestion, onCancel, listChapter }) => {
	const [form] = Form.useForm();
	const fileActions = useFileActions();
	useEffect(() => {
		if (selectedQuestion) {
			form.setFieldsValue({
				chapterId: selectedQuestion.chapterId,
				difficultyLevel: selectedQuestion.difficultyLevel,
			})
		} else {
			form.resetFields();
		}
	}, [selectedQuestion]);

	const optionChapters = useMemo(() => {
		return listChapter.map(item => {
			return {
				label: item.chapterName || "",
				value: item.id,
			}
		})
	}, [listChapter]);
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
		try {
			const value = await form.validateFields();
			console.log("value: ", value);
			const fileContent = value.contentQuestion?.[0]?.originFileObj;
			if (!fileContent) {
				message.error("Vui lòng chọn file đề bài");
				return;
			}
			const fileParamContent: FileParameter =
			{
				data: fileContent,
				fileName: fileContent.name,
			}
			let textInFile = await extractRawTextFromFile(fileContent);
			let paseTextInFile = parseContentQuestion(textInFile);
			const fileUrlContent = await fileActions.upload(fileParamContent);
			onOk(
				{
					...value,
					fileUrl: fileUrlContent,
					answers: paseTextInFile.answers
				}
			);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Modal
			open={open}
			closable={false}
			onCancel={onCancel}
			onOk={handleOk}
			forceRender
		>
			<Row justify="space-between" align="middle" gutter={16} style={{ marginBottom: 16 }}>
				<Col>
					{selectedQuestion ? <h2><b>Chỉnh sửa câu hỏi</b></h2> : <h2><b>Tạo mới câu hỏi</b></h2>}
				</Col>

				<Col>
					<Button href="/form-cau-hoi-mau.docx" download type="primary" icon={<DownloadOutlined />}>
						Tải file mẫu
					</Button>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form form={form} layout="vertical">

						<Form.Item
							name="chapterId"
							label="Thuộc chương"
							rules={[requiredRule("Chương")]}
						>
							<Select
								placeholder="Câu hỏi thuộc chương"
								options={optionChapters}
							/>
						</Form.Item>

						<Form.Item
							name="difficultyLevel"
							label="Độ khó"
							rules={[requiredRule("Độ khó")]}
						>
							<Select
								placeholder="Độ khó của câu hỏi"
								options={optionDifficultyLevel}
							/>
						</Form.Item>

						<Form.Item
							name="contentQuestion"
							label="Upload câu hỏi"
							valuePropName="fileList"
							getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
							rules={[requiredRule("File câu hỏi")]}
						>
							<Upload beforeUpload={() => false} maxCount={1}>
								<Button icon={<UploadOutlined />}>Chọn file</Button>
							</Upload>
						</Form.Item>

					</Form>
				</Col>
			</Row>
		</Modal>
	)
}
export default QuestionCreateUpdateModal