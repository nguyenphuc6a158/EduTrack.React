import React, { useMemo } from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
import { ClassDto } from "src/services/services_autogen";
import { ModeTabClassesEnum } from "src/lib/enumconst";
import { ResponsiveLayout } from "src/lib/appconst";

interface IClassTableProps {
	dataSource: ClassDto [];
	loading: boolean;
	onEdit: (record: ClassDto) => void;
	onDelete: (id: number)=> void;
	totalClass: number;
	mode: ModeTabClassesEnum;
	onClickRowClass?: (record: ClassDto) => void;
	onRemoveSelectedClass?: (record: ClassDto) => void;
}
const ClassTable: React.FC<IClassTableProps> = ({ dataSource, loading, onEdit, onDelete, totalClass, mode, onClickRowClass, onRemoveSelectedClass }) => {
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
			onFilter: (value: any, record: ClassDto) => (record.className || "").includes(String(value)),
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
	];
	const actionColumn = [
		{
			title: "Thao tác",
			key: "action",
			width: 200,
			align: "center" as const,
			render: (_: any, record: ClassDto) => (
				<Space size="middle">
					<Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}></Button>
					<Popconfirm title="Xóa lớp học này?" onConfirm={() =>record.id && onDelete(record.id)}>
						<Button type="link" danger icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	const actionReturnColumn = [
		{
			title: "Thao tác",
			key: "action",
			width: 200,
			align: "center" as const,
			render: (_: any, record: ClassDto) => (
				<Space size="middle">
					<Button type="link" onClick={()=>onRemoveSelectedClass?.(record)} danger icon={<RollbackOutlined />}></Button>
				</Space>
			),
		}
	];
	const finalColumns = () =>{
		if(mode === ModeTabClassesEnum.ASSIGNMENT){
			return columns;
		}
		if(mode === ModeTabClassesEnum.CLASS){
			return [...columns, ...actionColumn];
		}
		if(mode === ModeTabClassesEnum.ASSIGNMENT_SELECTED){
			return [...columns, ...actionReturnColumn];
		}
	}

	return (
		<Table 
			columns={finalColumns()} 
			dataSource={dataSource} 
			rowKey="id" 
			loading={loading}
			scroll={{ x: ResponsiveLayout.tableScrollX }}
			pagination={
				mode == ModeTabClassesEnum.CLASS ? 
					{
						placement: ["topEnd"],
						total: totalClass,
						pageSize: 10,
						showSizeChanger: true,
						showTotal: (total) => `Tổng: ${total}`,
					} : false
			}
			onRow={onClickRowClass ? (record) => ({
				onClick: () => onClickRowClass(record),
			}) : undefined}
		/>
	)
}

export default ClassTable;