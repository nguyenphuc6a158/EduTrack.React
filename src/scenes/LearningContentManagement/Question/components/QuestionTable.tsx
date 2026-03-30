import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import type React from "react";
import type { QuestionDto } from "src/services/services_autogen";
interface IQuestionTableProps{
	listQuestions: QuestionDto[];
	onDelete: (id: number) => void;
	onEdit: (selectedQuestion: QuestionDto) => void;
}
const QuestionTable: React.FC<IQuestionTableProps> = ({listQuestions, onDelete, onEdit}) => {
	const columns = [
		{
			title:'Tiêu đề',
			dataIndex:'content',
			key:'content',
		},
		{
			title:'Lời giải',
			dataIndex:'explanation',
			key:'explanation',
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
						<Popconfirm
							title="Xóa môn học?"
							description="Bạn có chắc chắn muốn xóa môn học này không?"
							onConfirm={() => onDelete(record.id)}
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
		/>
	)
}
export default QuestionTable