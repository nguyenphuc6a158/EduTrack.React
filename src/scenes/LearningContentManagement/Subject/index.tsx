import { PlusOutlined } from "@ant-design/icons";
import { App, Button, message } from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import SubjectTable from "./components/SubjectTable";
import { useSubjectLoading, useSubjects, useSubjectsActions, useTotalCountSubjectSubjects } from "src/stores/subjectStore";
import SubjectModal from "./components/SubjectModal";
import { CreateSubjectDto, SubjectDto, UpdateSubjectDto } from "src/services/services_autogen";

const SubjectManagement: React.FC = ()=>{
	const { message } = App.useApp();
	const listSubject = useSubjects();
	const actionSubjects = useSubjectsActions();
	const loading = useSubjectLoading();
	const totalSubject = useTotalCountSubjectSubjects();

	const [isCreateUpdateModalOpen, setIsCreateUpdateModalOpen] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState<SubjectDto | null>(null);
	const openAddModal = () => {
		setSelectedSubject(null)
		setIsCreateUpdateModalOpen(true);
	}; 
	const fetchSubject = async() => {
		try {
			await actionSubjects.getAll(undefined, 0, 100);
		} catch(error){
			message.error("Lấy danh sách môn học thất bại");
			console.log(error);
		}
	}
	useEffect(() => {
		fetchSubject()
	},[])
	const handleDelete = async (id: number) => {
		try {
			await actionSubjects.delete(id);
			message.success("Xóa môn học thành công");
		} catch (error) {
			message.error("Xóa môn học thất bại");
		}
	};
	const handleOk = async (value: any) => {
		if(selectedSubject == null){
			try{
				let item: CreateSubjectDto = new CreateSubjectDto();
				item.subjectName = value.subjectName;
				await actionSubjects.create(item)
			} catch (error){
				message.error("Thêm mới môn học thất bại")
			}
		} else {
			try {
				let item: UpdateSubjectDto = new UpdateSubjectDto();
				item.id = selectedSubject.id;
				item.subjectName = value.subjectName;
				await actionSubjects.update(item)
			} catch (error){
				message.error("Sửa tên môn học thất bại")
			}
		}
		fetchSubject();
		setIsCreateUpdateModalOpen(false);
	}
	const openEditModal = async (value: SubjectDto) => {
		setSelectedSubject(value)
		setIsCreateUpdateModalOpen(true)
	}
	return(
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Môn học</h2>
					<p className="text-gray-500">Thêm sửa xóa môn học</p>
				</div>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={openAddModal}
					size="large"
				>
					Thêm môn học
				</Button>
			</div>
			<SubjectModal
				handleOk={handleOk}
				selectedSubject={selectedSubject}
				open={isCreateUpdateModalOpen}
				onCancel={()=>setIsCreateUpdateModalOpen(false)}
			/>
			<SubjectTable 
				totalSubject={totalSubject}
				listSubject={listSubject}
				loading={loading}
				onDelete={handleDelete}
				onEdit={openEditModal}
			/>
		</div>
	)
}
export default SubjectManagement