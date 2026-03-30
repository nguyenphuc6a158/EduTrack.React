import { Button, Col, message, Space } from "antd";
import type React from "react";
import QuestionTable from "./components/QuestionTable";
import { useQuestionActions, useQuestiones } from "src/stores/questionStore";
import type { QuestionDto } from "src/services/services_autogen";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import QuestionModal from "./components/QuestionModal";
import { useChapterActions, useChapters } from "src/stores/chapterStore";

const QuestionManagement: React.FC = () => {
	const listQuestions = useQuestiones();
	const listChapters = useChapters();
	const actionChapters = useChapterActions();
	const questionActios = useQuestionActions();
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [selectedQuestion, setSelectedQuestion] = useState<QuestionDto|null>(null);
	const fetchQuestions = async () => {
		try{
			await questionActios.getAll();
		}catch(error){

		}
	}

	useEffect(()=>{
		fetchQuestions();
	},[])

	const onDelete = async (id: number) =>{
		try {
			await questionActios.delete(id);
			message.success("Xóa câu hỏi thành công");
		}catch(error){
			message.error("Xóa câu hỏi thất bại");
		}
	}
	const handleSubmit =  (value: any) => {

	}
	const openAddModal = () => {
		setIsOpenModal(true);
		setSelectedQuestion(null);
	}
	const openEditModal = (item: QuestionDto) => {
		setIsOpenModal(true);
		setSelectedQuestion(item)
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
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={openAddModal}
							size="large"
						>
							Thêm chương
						</Button>
					</Space.Compact>
				</Col>
			</div>
			<QuestionTable 
				listQuestions={listQuestions}
				onDelete={onDelete}
				onEdit={openEditModal}
			/>
			<QuestionModal
				onOk={handleSubmit}
				open={isOpenModal}
				selectedQuestion={selectedQuestion}
				onCancel={()=>{setIsOpenModal(false)}}
				listChapter={listChapters}
			/>
		</div>
	)
}
export default QuestionManagement