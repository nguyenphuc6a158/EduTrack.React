import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import type React from "react";
import type { SubjectDto } from "src/services/services_autogen";
interface ISubjectTableProps {
	listSubject: SubjectDto[];
	loading: boolean;
	onEdit: (value: SubjectDto) => void;
	onDelete: (id: number) => void;
	totalSubject: number;
}
const SubjectTable: React.FC<ISubjectTableProps> = ({listSubject, loading, onEdit, onDelete, totalSubject}) => {
	const colums = [
		{
			title: "Tên môn học",
			key:"subjectName",
			dataIndex:"subjectName",
		},
		{
			width: 200,
			align: "center" as const,
			title: "Hành động",
			render: (record: SubjectDto) => {
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
		}
	]
	return(
		<Table
			columns={colums}
			dataSource={listSubject}
			loading={loading}
			pagination={{
				placement: ["topEnd"],
				total: totalSubject,
				pageSize: 10,
				showSizeChanger: true,
				showTotal: (totalSubject) => `Tổng: ${totalSubject}`,
			}}
			rowKey="id"
		/>
	)
}
export default SubjectTable