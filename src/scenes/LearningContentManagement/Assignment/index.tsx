import { App, Button, Col, message } from "antd";
import type React from "react";
import AssignmentTable from "./components/AssignmentTable";
import { useAssignmentActions, useAssignments } from "src/stores/assignmentStore";
import { useEffect, useState } from "react";
import type { AssignmentDto, CreateAssignmentWithQuestionsDto, QuestionDto, UpdateAssignmentWithQuestionsDto } from "src/services/services_autogen";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuestionActions, useQuestions, useQuestionsByAssignment } from "src/stores/questionStore";
import { useChapterActions, useChapters } from "src/stores/chapterStore";
import QuestionInformationModal from "../Question/components/QuestionInformationModal";
import ExerciseCreateUpdateModal from "./components/ExerciseCreateUpdateModal";
import AssigmentModal from "./components/AssignmentModal";

const AssignmentManagement: React.FC = () =>{
	const listAssignment = useAssignments();
	const assignmentActions = useAssignmentActions();
	const listQuestions = useQuestions();
	const questionsActions = useQuestionActions();
	const listChapters = useChapters();
	const chaptersActions = useChapterActions();
	const listQuestionsByAssignment = useQuestionsByAssignment();
	const message = App.useApp().message;

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isOpenInfoModal, setIsOpenInfoModal] = useState<boolean>(false);
	const [isOpenAssignmentModal, setIsOpenAssignmentModal] = useState<boolean>(false);
	const [selectedAssignment, setSelectedAssignment] = useState<AssignmentDto | undefined>(undefined);
	const [selectedQuestion, setSelectedQuestion] = useState<QuestionDto | null>(null);
	const fetchAssigment = async () => {
		try{
			await assignmentActions.getAll();
		} catch(error){
			console.error("Failed to fetch assignment: ", error);
		}
	}
	const fetchQuestion = async () => {
		try{
			await questionsActions.getAll();
		} catch(error){
			console.error("Failed to fetch questions: ", error);
		}
	}
	const fetchChapter = async () => {
		try{
			await chaptersActions.getAll();
		} catch(error){
			console.error("Failed to fetch chapters: ", error);
		}
	}
	useEffect(() => {
		fetchAssigment();
		fetchQuestion();
		fetchChapter();
	}, []) 

	const onEdit = async (item: AssignmentDto) => {
		setSelectedAssignment(item);
		setIsOpenModal(true);
		await questionsActions.getQuestionByAssignment(item.id);
	}
	const onDelete = async (id: number) => {
		await assignmentActions.delete(id);
		message.success("Xóa bài tập thành công!");
		fetchAssigment();
	}
	const openAddModal = () => {
		setIsOpenModal(true);
		setSelectedAssignment(undefined);
	}
	const handleSubmit = async (values: CreateAssignmentWithQuestionsDto | UpdateAssignmentWithQuestionsDto) => {
		try{
			if(selectedAssignment) {
				await assignmentActions.updateAssignmentWithQuestions(values as UpdateAssignmentWithQuestionsDto);
				setIsOpenModal(false);
				fetchAssigment();
				message.success("Sửa bài tập thành công!");
			} else {
				await assignmentActions.createAssignmentWithQuestions(values as CreateAssignmentWithQuestionsDto);
				setIsOpenModal(false);
				fetchAssigment();
				message.success("Tạo bài tập thành công!");
			}
		} catch(error) {
			console.error("Failed to submit assignment: ", error);
			message.error("Tạo bài tập thất bại!");
		}
		await assignmentActions.getAll();
	}
	const openInforModal = (question: QuestionDto) => {
		setSelectedQuestion(question);
		setIsOpenInfoModal(true);
	}
	const onOkAssignment = () => {

	}
	const openAssignmentModal = () => {
		setIsOpenAssignmentModal(true);
	}
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Bài tập</h2>
					<p className="text-gray-500">Thêm sửa xóa bài tập</p>
				</Col>
				<Col>
					<Button
						type="primary"
						icon={<ExportOutlined />}
						onClick={openAssignmentModal}
						size="large"
					>
						Giao bài tập
					</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={openAddModal}
						size="large"
					>
						Thêm bài tập
					</Button>
				</Col>
			</div>
			<AssignmentTable
				listAssignment={listAssignment}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
			<ExerciseCreateUpdateModal
				open={isOpenModal}
				onCancel={() => setIsOpenModal(false)}
				onSubmit={handleSubmit}
				selectedAssignment={selectedAssignment}
				listQuestions={listQuestions}
				openInforModal={openInforModal}
				listChapters={listChapters}
				listQuestionsByAssignment={listQuestionsByAssignment}
			/>
			<QuestionInformationModal 
				open={isOpenInfoModal}
				selectedQuestion={selectedQuestion}
				onCancel={() => setIsOpenInfoModal(false)}
			/>
			<AssigmentModal 
				open={isOpenAssignmentModal}
				onCancel={() => setIsOpenAssignmentModal(false)}
				onOk={onOkAssignment}
			/>
		</div>
	)
}
export default AssignmentManagement