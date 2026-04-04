import { App, Card, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import type React from "react";
import { CreateAssignmentQuestionDto, CreateQuestionWithOptionsDto, CreateWithQuestionsDto, type AssignmentDto, type ChapterDto, type QuestionDto } from "src/services/services_autogen";
import QuestionTable from "../../Question/components/QuestionTable";
import { useMemo, useState } from "react";
import { ModeTableQuestionsEnum } from "src/lib/enum";
interface IAssignmentModalProps {
	open: boolean;
	onCancel: () => void;
	onSubmit: (values: CreateWithQuestionsDto) => void;
	selectedAssignment?: AssignmentDto;
	listQuestions: QuestionDto[];
	openInforModal: (question: QuestionDto) => void;
	listChapters: ChapterDto[];
}
const AssignmentModal : React.FC<IAssignmentModalProps> = ({ open, onCancel, onSubmit, selectedAssignment, listQuestions, openInforModal, listChapters }) => {
	const [formRef] = Form.useForm();
	const message = App.useApp().message;
	const [listSelectedQuestions, setListSelectedQuestions] = useState<QuestionDto[]>([]);
	const pushSelectedQuestion = (selectedItems: QuestionDto) => {
		if(listSelectedQuestions.some(question => question.id === selectedItems.id)) {
			return;
		}
		setListSelectedQuestions([...listSelectedQuestions, selectedItems]);
	};
	const listOptionsChapter = useMemo(() => {
		return listChapters.map((chapter) => ({
			label: chapter.chapterName,
			value: chapter.id,
		}))
	}, [listChapters]);
	const removeSelectedQuestion = (questionId: number) => {
		const updatedList = listSelectedQuestions.filter(question => question.id !== questionId);
		setListSelectedQuestions(updatedList);
	}
	const onOk = () => {
		let values = formRef.getFieldsValue();
		if (!listSelectedQuestions.length) {
			message.warning("Phải chọn ít nhất 1 câu hỏi");
			return;
		}
		let item: CreateWithQuestionsDto = new CreateWithQuestionsDto();
		let listassignmentQuestions: CreateAssignmentQuestionDto[] = [];
		listSelectedQuestions.forEach((question, index) => {
			let assignmentQuestion: CreateAssignmentQuestionDto = new CreateAssignmentQuestionDto();
			assignmentQuestion.questionId = question.id;
			assignmentQuestion.orderIndex = index + 1;
			listassignmentQuestions.push(assignmentQuestion);
		});
		item.title = values.title;
		item.chapterId = values.chapterId;
		item.assignmentQuestions = listassignmentQuestions;
		onSubmit(item);
	}
	return (
		<Modal
			open={open}
			onCancel={onCancel}
			onOk={onOk}
			width={"90%"}
		>
			<Row gutter={16}>
				<Col span={12}>
					<Card title="Danh sách câu hỏi">
						<QuestionTable 
							listQuestions={listQuestions} 
							tableMode={ModeTableQuestionsEnum.ASSIGNMENT}
							openInforQuestionModal={()=>{}}
							onDelete={()=>{}}
							onEdit={()=>{}}
							pushSelectedQuestion={pushSelectedQuestion}
							onDoubleClick={openInforModal}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title={selectedAssignment ? "Sửa bài tập" : "Thêm bài tập"}>
						<Form form={formRef} onFinish={onOk} style={{ width: "100%" }} layout="vertical">
							<Form.Item
								label="Tiêu đề"
								name="title"
								rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
							>
								<Input placeholder="Tiêu đề" />
							</Form.Item>
							<Form.Item
								label="Chương"
								name="chapterId"
								rules={[{ required: true, message: "Vui lòng nhập chương!" }]}
							>
								<Select 
									placeholder="Chọn chương" 
									options={listOptionsChapter}	
								/>
							</Form.Item>
							<QuestionTable 
								listQuestions={listSelectedQuestions} 
								tableMode={ModeTableQuestionsEnum.ASSIGNMENT_SELECTED}
								openInforQuestionModal={()=>{}}
								onDelete={()=>{}}
								onEdit={()=>{}}
								removeSelectedQuestion={removeSelectedQuestion}
							/>
						</Form>
					</Card>
				</Col>
			</Row>
		</Modal>
	)
};
export default AssignmentModal;