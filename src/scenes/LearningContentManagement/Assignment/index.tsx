import { Col } from "antd";
import type React from "react";
import AssignmentTable from "./components/AssignmentTable";
import { useAssignmentActions, useAssignments } from "src/stores/assignmentStore";
import { useEffect } from "react";

const AssignmentManagement: React.FC = () =>{
	const listAssignment = useAssignments();
	const assignmentActions = useAssignmentActions();
	const fetchAssigment = async () => {
		try{
			await assignmentActions.getAll();
		} catch(error){
			console.error("Failed to fetch assignment: ", error);
		}
	}
	useEffect(() => {
		fetchAssigment();
	}, []) 

	const onEdit = (item: any) => {
		console.log("Edit item: ", item);
	}
	const onDelete = (id: number) => {
		console.log("Delete item with id: ", id);
	}
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Bài tập</h2>
					<p className="text-gray-500">Thêm sửa xóa bài tập</p>
				</Col>
			</div>
			<AssignmentTable
				listAssignment={listAssignment}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</div>
	)
}
export default AssignmentManagement