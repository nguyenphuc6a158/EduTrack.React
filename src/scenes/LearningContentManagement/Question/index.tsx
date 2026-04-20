import { App, Button, Col, message, Select, Space } from "antd";
import type React from "react";
import QuestionTable from "./components/QuestionTable";
import { useQuestionActions, useQuestions, useQuestionLoading } from "src/stores/questionStore";
import { CreateQuestionDto, CreateQuestionOptionDto, CreateQuestionWithOptionsDto, QuestionDto, UpdateQuestionDto } from "src/services/services_autogen";
import { useEffect, useMemo, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useChapterActions, useChapters, usetotalCountChapter } from "src/stores/chapterStore";
import { useFileActions } from "src/stores/fileStore";
import { ModeTableQuestionsEnum } from "src/lib/enum";
import QuestionInformationModal from "./components/QuestionInformationModal";
import QuestionCreateUpdateModal from "./components/QuestionCreateUpdateModal";

const QuestionManagement: React.FC = () => {
	const {message} = App.useApp();
	const listQuestions = useQuestions();
	const listChapters = useChapters();
	const actionChapters = useChapterActions();
	const questionActios = useQuestionActions();
	const fileActions = useFileActions();
	const questionLoading = useQuestionLoading();
	const totalCountQuestion = usetotalCountChapter();

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isOpenInforModal, setIsOpenInforModal] = useState<boolean>(false);
	const [selectedQuestion, setSelectedQuestion] = useState<QuestionDto|null>(null);
	const [idSelectedChapter, setIdSelectedChapter] = useState<number | null>(()=>{
		const stored = localStorage.getItem("idSelectedChapter");
    	return stored ? Number(stored) : null;
	});
	const fetchQuestions = async (idSelectedChapter: number | null) => {
		try{
			if (idSelectedChapter != null){
				await questionActios.getQuestionByChapter(idSelectedChapter);
			} else {
				await questionActios.getAll();
			}
		}catch(error){

		}
	}
	const fetchChapter = async () => {
		try{
			await actionChapters.getAll();
		}catch(error){

		}
	}

	const optionChapter = useMemo(() => {
		return listChapters.map(item => ({
			value: item.id,
			label: item.chapterName || "",
		}));
	}, [listChapters]);

	useEffect(()=>{
		fetchQuestions(idSelectedChapter);
	},[idSelectedChapter]);
	useEffect(()=>{
		fetchChapter();
	},[]);

	const onDelete = async (item: QuestionDto) =>{
		try {
			await questionActios.delete(item.id);
			await fileActions.delete(item.fileUrlAssignment||"");
			await fetchQuestions(idSelectedChapter);
			message.success("Xóa câu hỏi thành công");
		}catch(error){
			message.error("Xóa câu hỏi thất bại");
		}
	}
	const handleSubmit =  async (value: any) => {
		try{
			if(selectedQuestion){
				let item: UpdateQuestionDto = new UpdateQuestionDto();
				item.id = selectedQuestion.id;
				item.chapterId = value.chapterId;
				item.fileUrlAssignment = value.fileUrlAssignment;
				item.fileUrlExplain = value.fileUrlExplain;
				item.difficultyLevel = value.difficultyLevel;
				await questionActios.update(item);
			} else {
				let item: CreateQuestionWithOptionsDto = new CreateQuestionWithOptionsDto();
				
				item.chapterId = value.chapterId;
				item.fileUrlAssignment = value.fileUrlAssignment;
				item.fileUrlExplain = value.fileUrlExplain;
				item.difficultyLevel = value.difficultyLevel;
				item.answers = value.answers.map((answer: any) => {
					let answerItem: CreateQuestionOptionDto = new CreateQuestionOptionDto();
					answerItem.content = answer.content;
					answerItem.isCorrect = answer.isCorrect;
					return answerItem;
				});
				// await questionActios.createWithOptions(item);
			}
		await fetchQuestions(idSelectedChapter);
		message.success('Cập nhật thông tin thành công')
		setIsOpenModal(false);
		}catch(error){
			message.error('Cập nhật thông tin thất bại')
		}
	}
	const openAddModal = () => {
		setIsOpenModal(true);
		setSelectedQuestion(null);
	}
	const openEditModal = (item: QuestionDto) => {
		setIsOpenModal(true);
		setSelectedQuestion(item)
	}
	const openInforQuestionModal = (item: QuestionDto) => {
		setSelectedQuestion(item);
		setIsOpenInforModal(true);
	}
	const onchangeIdChapterSelected = (item: number | undefined) =>{
		if (item === undefined){
			localStorage.removeItem("idSelectedChapter");
			setIdSelectedChapter(null);
			return
		};
		localStorage.setItem("idSelectedChapter", item.toString());
		setIdSelectedChapter(item)
	}
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Ngân hàng câu hỏi</h2>
					<p className="text-gray-500">Xem danh sách và tạo câu hỏi ở đây</p>
				</Col>
				<Col >
					<Space.Compact>
						<Select 
							allowClear
							value={idSelectedChapter} 
							style={{ width: "200px" }}
							options={optionChapter}
							placeholder="Tìm kiếm theo chương..."
							onChange={onchangeIdChapterSelected}
						/>
						<Button type="primary" icon={<SearchOutlined />} />
					</Space.Compact>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={openAddModal}
							size="large"
						>
							Thêm chương
						</Button>
				</Col>
			</div>
			<QuestionTable 
				loading={questionLoading}
				openInforQuestionModal={openInforQuestionModal}
				listQuestions={listQuestions}
				onDelete={onDelete}
				onEdit={openEditModal}
				totalCountQuestion={totalCountQuestion}
				tableMode={ModeTableQuestionsEnum.QUESTION}
			/>
			<QuestionCreateUpdateModal
				onOk={handleSubmit}
				open={isOpenModal}
				selectedQuestion={selectedQuestion}
				onCancel={()=>{setIsOpenModal(false)}}
				listChapter={listChapters}
			/>
			<QuestionInformationModal 
				open={isOpenInforModal}
				selectedQuestion={selectedQuestion}
				onCancel={()=>{setIsOpenInforModal(false)}}
			/>
		</div>
	)
}
export default QuestionManagement