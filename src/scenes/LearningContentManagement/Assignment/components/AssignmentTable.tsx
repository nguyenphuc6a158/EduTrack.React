import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd"
import { useMemo } from "react";
import type { Assignment, AssignmentDto } from "src/services/services_autogen";
import { ResponsiveLayout } from "src/lib/appconst";

interface IAssignmentTableProps {
	listAssignment: AssignmentDto[];
	onEdit: (item: AssignmentDto) => void;
	onDelete: (id: number) => void;
}
const AssignmentTable: React.FC<IAssignmentTableProps> = ({listAssignment, onEdit, onDelete}) => {
	const filterListChapters = useMemo(() => {
		return [... new Set(listAssignment.flatMap(assignment => assignment.chapterName))].map(chapterName => ({
			text: chapterName,
			value: chapterName || "",
		}));
	}, [listAssignment]);
	const filterListTitles = useMemo(() => {
		return [... new Set(listAssignment.flatMap(assignment => assignment.chapterName))].map(chapterName => ({
			text: chapterName,
			value: chapterName || "",
		}));
	}, [listAssignment]);

	const columns = [
		{
			title: "Tên bài tập",
			dataIndex: "title",
			key: "title",
			filters:filterListTitles,
			filterSearch: true,
			onFilter: (value:any, record: AssignmentDto) =>record.title === value,
		},
		{
			title: "Chương",
			dataIndex: "chapterName",
			key: "chapterName",
			filters:filterListChapters,
			filterSearch: true,
			onFilter: (value:any, record: AssignmentDto) =>record.chapterName === value,
		},
		{
			title: "Người tạo",
			dataIndex: "createBy",
			key: "createBy"
		},
		{
			title:"Hành động",
			width: 200,
			align: "center" as const,
			render: (record: AssignmentDto) => {
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
	return (
		<Table 
			columns={columns}
			dataSource={listAssignment}
			rowKey={`id`}
			scroll={{ x: ResponsiveLayout.tableScrollX }}
		/>
	)
}
export default AssignmentTable