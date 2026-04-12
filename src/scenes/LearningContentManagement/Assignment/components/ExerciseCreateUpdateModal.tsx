import { App, Card, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import type React from "react";
import { CreateAssignmentQuestionDto, CreateAssignmentWithQuestionsDto, CreateQuestionWithOptionsDto, UpdateAssignmentWithQuestionsDto, type AssignmentDto, type ChapterDto, type QuestionDto } from "src/services/services_autogen";
import QuestionTable from "../../Question/components/QuestionTable";
import { useEffect, useMemo, useState } from "react";
import { ModeTableQuestionsEnum } from "src/lib/enum";
import { useQuestionsByAssignment } from "src/stores/questionStore";
interface IExerciseCreateUpdateModalProps {
	open: boolean;
	onCancel: () => void;
	onSubmit: (values: CreateAssignmentWithQuestionsDto | UpdateAssignmentWithQuestionsDto) => void;
	selectedAssignment?: AssignmentDto;
	listQuestions: QuestionDto[];
	openInforModal: (question: QuestionDto) => void;
	listChapters: ChapterDto[];
	listQuestionsByAssignment: QuestionDto[];
}
const ExerciseCreateUpdateModal : React.FC<IExerciseCreateUpdateModalProps> = ({ open, onCancel, onSubmit, selectedAssignment, listQuestions, openInforModal, listChapters, listQuestionsByAssignment }) => {
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
	useEffect(() => {
		if(!open) {
			return;
		}
		if(selectedAssignment) {
			formRef.setFieldsValue({
				title: selectedAssignment.title,
				chapterId: selectedAssignment.chapterId,
			});
			
		} else {
			formRef.resetFields();
			setListSelectedQuestions([]);
		}
	}, [selectedAssignment]);
	const onOk = () => {
		let values = formRef.getFieldsValue();
		
		if (!listSelectedQuestions.length) {
			message.warning("Phải chọn ít nhất 1 câu hỏi");
			return;
		}
		if(selectedAssignment != undefined) {
			let item: UpdateAssignmentWithQuestionsDto = new UpdateAssignmentWithQuestionsDto();
			let listassignmentQuestions: CreateAssignmentQuestionDto[] = [];
			listSelectedQuestions.forEach((question, index) => {
				let assignmentQuestion: CreateAssignmentQuestionDto = new CreateAssignmentQuestionDto();
				assignmentQuestion.questionId = question.id;
				assignmentQuestion.orderIndex = index + 1;
				listassignmentQuestions.push(assignmentQuestion);
			});
			item.id = selectedAssignment.id;
			item.title = values.title;
			item.chapterId = values.chapterId;
			item.assignmentQuestions = listassignmentQuestions;
			onSubmit(item);
		} else if (selectedAssignment==undefined) {
			let item: CreateAssignmentWithQuestionsDto = new CreateAssignmentWithQuestionsDto();
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
		
	}
	return (
		<Modal
			open={open}
			onCancel={onCancel}
			onOk={onOk}
			width={"90%"}
			closable={false}
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
								openInforQuestionModal={openInforModal}
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
export default ExerciseCreateUpdateModal;