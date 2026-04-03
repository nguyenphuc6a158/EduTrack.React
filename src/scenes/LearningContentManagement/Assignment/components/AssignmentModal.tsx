import { Card, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import type React from "react";
import type { AssignmentDto, QuestionDto } from "src/services/services_autogen";
import QuestionTable from "../../Question/components/QuestionTable";
import { useState } from "react";
interface IAssignmentModalProps {
	open: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
	selectedAssignment?: AssignmentDto;
	listQuestions?: QuestionDto[];
	openInforModal: (question: QuestionDto) => void;
}
const AssignmentModal : React.FC<IAssignmentModalProps> = ({ open, onCancel, onSubmit, selectedAssignment, listQuestions, openInforModal }) => {
	const [listSelectedQuestions, setListSelectedQuestions] = useState<QuestionDto[]>([]);
	const pushSelectedQuestion = (selectedItems: QuestionDto) => {
		setListSelectedQuestions([...listSelectedQuestions, selectedItems]);
	};
	return (
		<Modal
			open={open}
			onCancel={onCancel}
			onOk={onSubmit}
			width={"90%"}
		>
			<Row gutter={16}>
				<Col span={12}>
					<Card title="Danh sách câu hỏi">
						<QuestionTable 
							listQuestions={listQuestions} 
							onlyView={true}
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
						<Form style={{ width: "100%" }} layout="vertical">
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
								<Select placeholder="Chọn chương" />
							</Form.Item>
							<Form.Item
								label="Danh sách câu hỏi dùng để tạo bài tập"
								name="listQuestionIds"
								rules={[{ required: true, message: "Vui lòng nhập chương!" }]}
							>
								<QuestionTable 
									listQuestions={listSelectedQuestions} 
									onlyView={true}
									openInforQuestionModal={()=>{}}
									onDelete={()=>{}}
									onEdit={()=>{}}
								/>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</Modal>
	)
};
export default AssignmentModal;