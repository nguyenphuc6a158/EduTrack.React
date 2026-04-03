import React, { useMemo } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { StudentClassDto, ClassDto, UserDto } from "src/services/services_autogen";

interface IStudentTableProps {
	dataSource: StudentClassDto[];
	loading: boolean;
	onEdit: (record: StudentClassDto) => void;
	onDelete: (id: number) => void;
	totalStudent: number;
	listClasses?: ClassDto[];
	listTeachers?: UserDto[];
	listStudents?: UserDto[];
}

const StudentTable: React.FC<IStudentTableProps> = ({
	dataSource,
	loading,
	onEdit,
	onDelete,
	totalStudent,
	listStudents = []
}) => {

	const getStudentInfo = (studentId: number) => {
		return listStudents.find(s => s.id === studentId);
	};

	const filterStudentNames = useMemo(() => {
		return [...new Set(dataSource?.flatMap(item => {
			const student = listStudents.find(s => s.id === item.studentId);
			return student?.fullName || `Học sinh #${item.studentId}`;
		}))].map(name => {
			return ({
				value: name,
				text: name || "",
			})
		})
	}, [dataSource, listStudents]);

	const columns = [
		{
			title: "Tên học sinh",
			key: "studentName",
			width: 150,
			filters: filterStudentNames,
			filterSearch: true,
			onFilter: (value: any, record: StudentClassDto) => {
				const student = getStudentInfo(record.studentId);
				const displayName = student?.fullName || `Học sinh #${record.studentId}`;
				return displayName.includes(String(value));
			},
			render: (_: unknown, record: StudentClassDto) => {
				const student = getStudentInfo(record.studentId);
				return student?.fullName || `Học sinh #${record.studentId}`;
			},
		},
		{
			title: "Tên lớp học",
			key: "className",
			dataIndex: "className",
			width: 120,
		},
		{
			title: "Hành động",
			key: "action",
			width: 200,
			align: "center" as const,
			render: (_: unknown, record: StudentClassDto) => (
				<Space size="middle">
					<Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} />
					<Popconfirm title="Xóa học sinh này?" onConfirm={() => onDelete(record.id)}>
						<Button type="link" danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			)
		}
	];

	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			rowKey="id"
			loading={loading}
			pagination={{
				placement: ["topEnd"],
				total: totalStudent,
				pageSize: 10,
				showSizeChanger: true,
				showTotal: (totalStudent) => `Tổng: ${totalStudent}`
			}}
		/>
	);
};

export default StudentTable;
