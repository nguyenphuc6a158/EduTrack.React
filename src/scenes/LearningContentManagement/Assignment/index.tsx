import { App, Button, Col, message } from "antd";
import type React from "react";
import AssignmentTable from "./components/AssignmentTable";
import { useAssignmentActions, useAssignments } from "src/stores/assignmentStore";
import { useEffect, useState } from "react";
import AssignmentModal from "./components/AssignmentModal";
import type { AssignmentDto, CreateWithQuestionsDto, QuestionDto } from "src/services/services_autogen";
import { PlusOutlined } from "@ant-design/icons";
import { useQuestionActions, useQuestions, useQuestionsByAssignment } from "src/stores/questionStore";
import InformationModal from "../Question/components/InformationModal";
import { useChapterActions, useChapters } from "src/stores/chapterStore";

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
	const onDelete = (id: number) => {
		console.log("Delete item with id: ", id);
	}
	const openAddModal = () => {
		setIsOpenModal(true);
		setSelectedAssignment(undefined);
	}
	const handleSubmit = async (values: CreateWithQuestionsDto) => {
		try{
			if(selectedAssignment) {
			} else {
				await assignmentActions.createWithQuestions(values);
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
			<AssignmentModal
				open={isOpenModal}
				onCancel={() => setIsOpenModal(false)}
				onSubmit={handleSubmit}
				selectedAssignment={selectedAssignment}
				listQuestions={listQuestions}
				openInforModal={openInforModal}
				listChapters={listChapters}
				listQuestionsByAssignment={listQuestionsByAssignment}
			/>
			<InformationModal 
				open={isOpenInfoModal}
				selectedQuestion={selectedQuestion}
				onCancel={() => setIsOpenInfoModal(false)}
			/>
		</div>
	)
}
export default AssignmentManagement