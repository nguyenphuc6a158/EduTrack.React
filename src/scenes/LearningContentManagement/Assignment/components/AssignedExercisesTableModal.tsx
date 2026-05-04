import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, Popconfirm, Space, Table } from "antd"
import type { ClassAssignmentDto } from "src/services/services_autogen";
import { ResponsiveLayout } from "src/lib/appconst";

interface IAssignedExercisesTableProps {
	onEdit: (record: ClassAssignmentDto) => void;
	onDelete: (id: number) => void;
	open: boolean;
	onCancel: () => void;
	listClassAssignments: ClassAssignmentDto[];
}
const AssignedExercisesTableModal: React.FC<IAssignedExercisesTableProps> = ({onEdit, onDelete, open, onCancel, listClassAssignments}) => {
	const colunms = [
		{
			title: "Tên lớp học",
			dataIndex: "className",
			key: "className",
			
		},
		{
			title: "Tên bài tập",
			dataIndex: "assignmentName",
			key: "assignmentName",
		},
		{
			title: "Ngày xuất bản",
			dataIndex: "publicTime",
			key: "publicTime",
			render: (value: string) => {
				const date = new Date(value);
				return date.toLocaleString("vi-VN");
			}
		},
		{
			title:"Hành động",
			key: "action",
			render: (record: ClassAssignmentDto) => {
				return(
					<Space size="middle">
						<Button
							title="Chỉnh sửa"
							type="text"
							icon={<EditOutlined />}
							onClick={() => onEdit(record)}
						/>
						<Popconfirm
							title="Xóa bài tập?"
							description="Bạn có chắc chắn muốn xóa bài tập này không?"
							onConfirm={() => onDelete(record.id)}
							okText="Xóa"
							cancelText="Hủy"
						>
							<Button
								title="Xóa bài tập"
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
		<Modal 
			title="Danh sách bài tập đã giao"
			open={open}
			onCancel={onCancel}
			width={ResponsiveLayout.modalWidthFluidMedium}
			footer={null}
		>
			<Table 
				columns={colunms} 
				dataSource={listClassAssignments}
				rowKey={(record) => record.id}
				scroll={{ x: ResponsiveLayout.tableScrollX }}
			/>
		</Modal>
	)
}
export default AssignedExercisesTableModal;