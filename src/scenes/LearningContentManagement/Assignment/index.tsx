import { App, Button, Col, message } from "antd";
import type React from "react";
import AssignmentTable from "./components/AssignmentTable";
import { useAssignmentActions, useAssignments } from "src/stores/assignmentStore";
import { useEffect, useState } from "react";
import { ClassAssignmentDto, CreateListClassAssgnmentDto, UpdateClassAssignmentDto, type AssignmentDto, type CreateAssignmentWithQuestionsDto, type QuestionDto, type UpdateAssignmentWithQuestionsDto } from "src/services/services_autogen";
import { PlusOutlined, ReadOutlined, SendOutlined } from "@ant-design/icons";
import { useQuestionActions, useQuestions, useQuestionsByAssignment } from "src/stores/questionStore";
import { useChapterActions, useChapters } from "src/stores/chapterStore";
import QuestionInformationModal from "../Question/components/QuestionInformationModal";
import ExerciseCreateUpdateModal from "./components/ExerciseCreateUpdateModal";
import AssigmentModal, { type ClassAssignmentItem } from "./components/AssignmentModal";
import { useClassActions, useClasses } from "src/stores/classStore";
import { useClassAssignmentActions, useClassAssignments } from "src/stores/classAssignmentStore";
import EditClassAssignmentModal from "./components/EditClassAssignmentModal";
import AssignedExercisesTableModal from "./components/AssignedExercisesTableModal";

const AssignmentManagement: React.FC = () =>{
	const listAssignment = useAssignments();
	const assignmentActions = useAssignmentActions();
	const listQuestions = useQuestions();
	const questionsActions = useQuestionActions();
	const classesActions = useClassActions();
	const listChapters = useChapters();
	const chaptersActions = useChapterActions();
	const listQuestionsByAssignment = useQuestionsByAssignment();
	const listClasses = useClasses();
	const classAssignmentActions = useClassAssignmentActions();
	const listClassAssignments = useClassAssignments();
	const message = App.useApp().message;

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isOpenInfoModal, setIsOpenInfoModal] = useState<boolean>(false);
	const [isOpenAssignmentModal, setIsOpenAssignmentModal] = useState<boolean>(false);
	const [selectedAssignment, setSelectedAssignment] = useState<AssignmentDto | undefined>(undefined);
	const [selectedQuestion, setSelectedQuestion] = useState<QuestionDto | null>(null);
	const [isOpenAssignedExercisesTable, setIsOpenAssignedExercisesTable] = useState<boolean>(false);
	const [isOpenEditAssignedExercisesModal, setIsOpenEditAssignedExercisesModal] = useState<boolean>(false);
	const [selectedClassAssignment, setSelectedClassAssignment] = useState<ClassAssignmentDto | null>(null);
	const currentUserId = localStorage.getItem("userId");
	const fetchClass = async () => {
		try{
			await classesActions.getAll();
		} catch(error){
			console.error("Failed to fetch assignment: ", error);
		}
	}
	const fetchClassAssignment = async () => {
		try{
			await classAssignmentActions.getAllClassAssignmentByCreaterUserId(Number(currentUserId));
		} catch(error){
			console.error("Failed to fetch assignment: ", error);
		}
	}
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
	}, []) 

	const onEditAssignment = async (item: AssignmentDto) => {
		setSelectedAssignment(item);
		setIsOpenModal(true);
		await questionsActions.getQuestionByAssignment(item.id);
	}
	const onDeleteAssignment = async (id: number) => {
		await assignmentActions.delete(id);
		message.success("Xóa bài tập thành công!");
		fetchAssigment();
	}
	const openAddModal = () => {
		setIsOpenModal(true);
		setSelectedAssignment(undefined);
		fetchChapter();
		fetchQuestion();
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
	const onOkAssignmentModal = (value: ClassAssignmentItem) => {
		if(value.listClasses.length === 0 || value.assignmentId === -1 || !value.publicTime){
			message.error("Vui lòng chọn đầy đủ thông tin!");
			return;
		}
		let item: CreateListClassAssgnmentDto = new CreateListClassAssgnmentDto();
		item.assignmentId = value.assignmentId;
		item.listClasses = value.listClasses;
		item.publicTime = value.publicTime.toDate()
		classAssignmentActions.createListClassAssignment(item);
	}
	const openAssignmentModal = async () => {
		setIsOpenAssignmentModal(true);
		await fetchClass();
	}

	const openAssignedExercisesTable = async () => {
		setIsOpenAssignedExercisesTable(true);
		await fetchClassAssignment();
	}
	const handleEditAssignedExercises = async(record: ClassAssignmentDto) => {
		if(selectedClassAssignment==null){
			message.error("Không tìm thấy bài tập đã giao!");
			return;
		}
		try{
			let item: UpdateClassAssignmentDto = new UpdateClassAssignmentDto();
			item.id = selectedClassAssignment.id;
			item.assignmentId = record.assignmentId;
			item.classId = record.classId;
			item.publicTime = record.publicTime;
			await classAssignmentActions.update(item);
			message.success("Cập nhật bài tập đã giao thành công!");
			await fetchClassAssignment();
			setIsOpenEditAssignedExercisesModal(false);
		} catch(error){
			console.error("Failed to update class assignment: ", error);
			message.error("Cập nhật bài tập đã giao thất bại!");
		}
	}
	const openEditAssignedExercisesModal = async (record: ClassAssignmentDto) => {
		setIsOpenEditAssignedExercisesModal(true);
		setSelectedClassAssignment(record);
		await fetchClass();
	}
	const onDeleteAssignedExercises = async (id: number) => {
		await classAssignmentActions.delete(id);
		message.success("Xóa bài tập đã giao thành công!");
		await fetchClassAssignment();
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
						icon={<ReadOutlined />}
						onClick={openAssignedExercisesTable}
						size="large"
					>
						Bài tập bạn đã giao
					</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button
						type="primary"
						icon={<SendOutlined />}
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
				onEdit={onEditAssignment}
				onDelete={onDeleteAssignment}
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
				listAssignment={listAssignment}
				open={isOpenAssignmentModal}
				onCancel={() => setIsOpenAssignmentModal(false)}
				onOk={onOkAssignmentModal}
				listClasses={listClasses}
			/>
			<AssignedExercisesTableModal
				onEdit={openEditAssignedExercisesModal}
				onDelete={onDeleteAssignedExercises}
				open={isOpenAssignedExercisesTable}
				onCancel={() => setIsOpenAssignedExercisesTable(false)}
				listClassAssignments={listClassAssignments}
			/>
			<EditClassAssignmentModal
				open={isOpenEditAssignedExercisesModal}
				onCancel={() => setIsOpenEditAssignedExercisesModal(false)}
				onOk={handleEditAssignedExercises}
				selectedClassAssignment={selectedClassAssignment}
				listAssignments={listAssignment}
				listClasses={listClasses}
			/>
		</div>
	)
}
export default AssignmentManagement