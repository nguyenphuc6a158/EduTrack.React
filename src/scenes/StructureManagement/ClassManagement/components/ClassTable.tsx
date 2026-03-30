import React, { useMemo } from "react";
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
	const filterTeacherNames = useMemo(()=>{
		 return [...new Set(dataSource?.flatMap(dataSource => dataSource.teacherName || []))].map(item=>{
            return({
                value: item,
                text: item || "",
            })
        })
	},[dataSource]);
	const filterClassNames = useMemo(()=>{
		 return [...new Set(dataSource?.flatMap(dataSource => dataSource.className || []))].map(item=>{
            return({
                value: item,
                text: item || "",
            })
        })
	},[dataSource])
	const columns = [
		{
			title: "Tên lớp học",
			dataIndex: "className", 
			key: "className",
			filters: filterClassNames,
			filterSearch: true,
			onFilter: (value: any, record: ClassDto) => (record.teacherName || "").includes(String(value)),
		},
		{
			title: "Giáo viên", 
			dataIndex: "teacherName",
			key: "teacherId",
			filters: filterTeacherNames,
			filterSearch: true,
			onFilter: (value: any, record: ClassDto) => (record.teacherName || "").includes(String(value)),
		},
		{
			title: "Khối học", 
			dataIndex: "gradeName",
			key: "gradeId",
		},
		{
			title: "Thao tác",
			key: "action",
			width: 200,
			align: "center" as const,
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