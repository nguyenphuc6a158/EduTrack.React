import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { App, Button, Col, Form, Input, message, Modal, Row, Select, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import ViewFilePDF from "src/components/ViewFilePDF";
import { ModeViewFilePDF } from "src/lib/enumconst";
import { parseAnswers, readPdfText } from "src/lib/readTextPdf";
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
	const {message} = App.useApp();
	const [listAnswers, setListAnswers] = useState<{ key: string; content: string }[]>([])
	const [assignmentPdfUrl, setAssignmentPdfUrl] = useState<string | null>(null);
	const [explainPdfUrl, setExplainPdfUrl] = useState<string | null>(null);
	const [selectCorrectAnswer, setSelectCorrectAnswer] = useState<string | null>(null);
	const optionCorrectAnswer = useMemo(()=>{
		return listAnswers.map(item=>{
			return{
				value: item.key,
				label: item.key || "",
			}
		})
	},[listAnswers]);
	useEffect(()=>{
		setAssignmentPdfUrl(null);
		setExplainPdfUrl(null);
	},[open,selectedQuestion])
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
	];

	const handleFileAssignmentChange = async (file: File) => {
		try {
			let text = await readPdfText(file);
			let answers = parseAnswers(text);
			if(answers.length == 0){
				message.error("Bạn đang chọn sai định dạng file câu hỏi mẫu")
				 return Upload.LIST_IGNORE;
			}
			setListAnswers(answers);
			const url = URL.createObjectURL(file);
			setAssignmentPdfUrl(url);
			form.setFieldsValue({
				correctAnswer: undefined,
			});
		} catch (err) {
			console.log(err);
			message.error("Lỗi đọc file PDF");
		}
	};

	const handleFileExplainChange = async (file: File) => {
		try {
			const url = URL.createObjectURL(file);
			setExplainPdfUrl(url);
			form.setFieldsValue({
				correctAnswer: undefined,
			});
		} catch (err) {
			console.log(err);
			message.error("Lỗi đọc file PDF");
		}
	};

	const handleOk = async () => {
		try {
			const value = await form.validateFields();
			const fileAssignment = value.fileAssignment?.[0]?.originFileObj;
			const fileExplain = value.fileExplain?.[0]?.originFileObj;
			if (!fileAssignment || !fileExplain) {
				return;
			}
			const fileParamAssignment: FileParameter =
			{
				data: fileAssignment,
				fileName: fileAssignment.name,
			}
			const fileParamExplain: FileParameter =
			{
				data: fileExplain,
				fileName: fileExplain.name,
			}
			const fileUrlAssignment = await fileActions.upload(fileParamAssignment);
			const fileUrlExplain = await fileActions.upload(fileParamExplain);
			let text = await readPdfText(fileAssignment);
			let answers = parseAnswers(text);
			let item = {
				chapterId: value.chapterId,
				difficultyLevel: value.difficultyLevel,
				fileUrlAssignment: fileUrlAssignment,
				fileUrlExplain: fileUrlExplain,
				answers: answers,
				correctAnswer: selectCorrectAnswer
			}
			onOk(item);
		} catch (error) {
			console.log(error)
		}
	}
	const onchangeSelectCorrectAnswer = (value: string) => {
		setSelectCorrectAnswer(value)
	}
	return (
		<Modal
			open={open}
			closable={false}
			onCancel={onCancel}
			onOk={handleOk}
			forceRender
			width={"90%"}
		>
			<Row gutter={16}>
				<Col span={12}>
					{assignmentPdfUrl && <ViewFilePDF fileUrl={assignmentPdfUrl} mode={ModeViewFilePDF.DEMOQUESTIONVIEW}/>}
					{explainPdfUrl && <ViewFilePDF fileUrl={explainPdfUrl} mode={ModeViewFilePDF.DEMOQUESTIONVIEW}/>}
				</Col>
				<Col span={12}>
					<Row justify="space-between" align="middle" gutter={16} style={{ marginBottom: 16 }}>
						<Col>
							{selectedQuestion ? <h2><b>Chỉnh sửa câu hỏi</b></h2> : <h2><b>Tạo mới câu hỏi</b></h2>}
						</Col>

						<Col>
							<Button href="/form-cau-hoi-mau.docx" download type="primary" icon={<DownloadOutlined />}>
								Tải file mẫu câu hỏi
							</Button>
							&nbsp;&nbsp;&nbsp;
							<Button href="/form-giai-thich-mau.docx" download type="primary" icon={<DownloadOutlined />}>
								Tải file mẫu giải thích
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
								<Row>
									<Col span={12}>
										<Form.Item
											name="fileAssignment"
											label="Upload câu hỏi"
											valuePropName="fileList"
											getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
											rules={[requiredRule("File câu hỏi")]}
										>
											<Upload 
												beforeUpload={(file) => {
													const isPdf = file.type === "application/pdf";
													if (!isPdf) {
														message.error("Chỉ được upload file PDF!");
													return Upload.LIST_IGNORE;
													}
													handleFileAssignmentChange(file);
													return false;
												}}
												accept=".pdf,application/pdf"
												maxCount={1}
											>
												<Button icon={<UploadOutlined />}>Chọn file</Button>
											</Upload>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="fileExplain"
											label="Upload giải thích"
											valuePropName="fileList"
											getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
											rules={[requiredRule("File câu hỏi")]}
										>
											<Upload 
												beforeUpload={(file) => {
													const isPdf = file.type === "application/pdf";
													if (!isPdf) {
														message.error("Chỉ được upload file PDF!");
													return Upload.LIST_IGNORE;
													}
													handleFileExplainChange(file);
													return false;
												}}
												accept=".pdf,application/pdf"
												maxCount={1}
											>
												<Button icon={<UploadOutlined />}>Chọn file</Button>
											</Upload>
										</Form.Item>
									</Col>
									<Form.Item
										name="correctAnswer"
										label="Chọn câu trả lời đúng"
										rules={[requiredRule("File câu hỏi")]}
									>
										<Select 
											value={selectCorrectAnswer}
											onChange={(value)=>onchangeSelectCorrectAnswer(value)}
											options={optionCorrectAnswer}
										/>
									</Form.Item>
								</Row>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		</Modal>
	)
}
export default QuestionCreateUpdateModal