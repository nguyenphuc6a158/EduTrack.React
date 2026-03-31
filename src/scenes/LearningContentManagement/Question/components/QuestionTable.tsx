import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import type React from "react";
import { AppConsts } from "src/lib/appconst";
import type { QuestionDto } from "src/services/services_autogen";
interface IQuestionTableProps{
	listQuestions: QuestionDto[];
	onDelete: (item: QuestionDto) => void;
	onEdit: (selectedQuestion: QuestionDto) => void;
	openInforQuestionModal: (selectedQuestion: QuestionDto) => void;
	loading: boolean;
}
const QuestionTable: React.FC<IQuestionTableProps> = ({listQuestions, onDelete, onEdit, openInforQuestionModal, loading}) => {
	const columns = [
		{
			title:'Đề bài',
			dataIndex:'content',
			key:'content',
			width: 500,
		},
		{
			title:'Lời giải',
			dataIndex:'explanation',
			key:'explanation',
			width: 500,
		},
		{
			title:'Độ khó',
			dataIndex:'difficultyLevel',
			key:'difficultyLevel',
		},
		{
			title:'Chương',
			dataIndex:'chapterName',
			key:'chapterName',
		},
		{
			title:'Hành động',
			width: 200,
			align: "center" as const,
			render: (record: QuestionDto) => {
				return(
					<Space size="middle">
						<Button
							title="Chỉnh sửa"
							type="text"
							icon={<EditOutlined />}
							onClick={() => onEdit(record)}
						/>
						<Button
							title="Xem chi tiết"
							type="text"
							icon={<InfoCircleOutlined />}
							onClick={() => openInforQuestionModal(record)}
						/>
						<Popconfirm
							title="Xóa môn học?"
							description="Bạn có chắc chắn muốn xóa môn học này không?"
							onConfirm={() => onDelete(record)}
							okText="Xóa"
							cancelText="Hủy"
						>
							<Button
								title="Xóa môn học"
								type="text"
								danger
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</Space>
				)
			}
		},
	]
	return(
		<Table
			columns={columns}
			dataSource={listQuestions}
			rowKey={"id"}
			loading={loading}
		/>
	)
}
export default QuestionTable