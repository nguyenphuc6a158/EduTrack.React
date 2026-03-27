import { useEffect, useState } from "react";
import { Button, message, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ClassTable from "./components/ClassTable"; 
import ClassModal from "./components/ClassModal";
import { useGradeActions, useGradees } from "src/stores/gradeStore";
import { useClassActions, useClasses, useClassLoading, useTotalCountClass } from "src/stores/classStore";
import { ClassDto, CreateClassDto, UpdateClassDto } from "src/services/services_autogen";

const ClassManagement = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<ClassDto | null>(null); 

	const listClasses = useClasses();
	const loading = useClassLoading();
	const actionsClass = useClassActions();
	const listGrades = useGradees();
	const getAllGrades =  useGradeActions().getAll;
	const totalClass = useTotalCountClass();

	const fetchData = async() => {
		await actionsClass.getAll(undefined, 0, 100);
		await getAllGrades(undefined,undefined,undefined);
	}

	useEffect ( () => {
		fetchData();
	}, []);

	const handleOk = async (values: any) => {
		try {
			if (editingItem) {
				let item: UpdateClassDto = new UpdateClassDto();
				item.id = editingItem.id
				item.className = values.className;
				item.gradeId = values.gradeId;
				item.teacherId = values.teacherId;
				await actionsClass.update(item);
				message.success("Cập nhật thành công");
			} else {
				let item: CreateClassDto = new CreateClassDto();
				item.className = values.className;
				item.gradeId = values.gradeId;
				item.teacherId = values.teacherId;
				await actionsClass.create(item);
				message.success("Thêm mới thành công");
			}
			setIsModalOpen(false);
			fetchData(); 
		} catch (error) {
			message.error("Lỗi khi lưu");
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Quản lý lớp học</h2>
					<p className="text-gray-500">Thêm sửa xóa lớp học, thay đổi giáo viên và khối cho lớp</p>
				</div>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
					Thêm lớp học
				</Button>
			</div>
			<ClassTable 
				dataSource={listClasses} 
				loading={loading} 
				onEdit={(item: any) => { setEditingItem(item); setIsModalOpen(true); }} 
				onDelete={async (id: number) => { await actionsClass.delete(id); fetchData(); }} 
				totalClass={totalClass}
			/>
			<ClassModal 
				listGrades={listGrades}
				visible={isModalOpen} 
				editingItem={editingItem} 
				onOk={handleOk} 
				onCancel={() => setIsModalOpen(false)} 
				confirmLoading={loading} 
			/>
		</div>
	);
};

export default ClassManagement;