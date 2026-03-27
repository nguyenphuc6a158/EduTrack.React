import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ClassDto } from "src/services/services_autogen";
interface IClassTableProps {
	dataSource: ClassDto [];
	loading: boolean;
	onEdit: (record: ClassDto) => void;
	onDelete: (id: number)=> void;
	totalClass: number;
}
const ClassTable: React.FC<IClassTableProps> = ({ dataSource, loading, onEdit, onDelete, totalClass}) => {
	const columns = [
		{
			title: "Tên lớp học",
			dataIndex: "className", 
			key: "className",
		},
		{
			title: "Giáo viên", 
			dataIndex: "teacherName",
			key: "teacherId",
		},
		{
			title: "Khối học", 
			dataIndex: "gradeName",
			key: "gradeId",
		},
		{
			title: "Thao tác",
			key: "action",
			width: 100,
			render: (_: any, record: ClassDto) => (
				<Space size="middle">
					<Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}></Button>
					<Popconfirm title="Xóa lớp học này?" onConfirm={() => onDelete(record.id)}>
						<Button type="link" danger icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Table 
			columns={columns} 
			dataSource={dataSource} 
			rowKey="id" 
			loading={loading} 
			pagination={{
				placement: ["topEnd"],
				total: totalClass,
				pageSize: 10,
				showSizeChanger: true,
				showTotal: (totalClass) => `Tổng: ${totalClass}`,
			}}
		/>
	)
};

export default ClassTable;