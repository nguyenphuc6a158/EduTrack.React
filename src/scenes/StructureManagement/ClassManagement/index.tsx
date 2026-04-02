import { useEffect, useMemo, useState } from "react";
import { Button, message, Card, Col, Space, Select, App } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ClassTable from "./components/ClassTable"; 
import ClassModal from "./components/ClassModal";
import { useGradeActions, useGradees } from "src/stores/gradeStore";
import { useClassActions, useClasses, useClassLoading, useTotalCountClass } from "src/stores/classStore";
import { ClassDto, CreateClassDto, GradeDto, UpdateClassDto } from "src/services/services_autogen";
import { useTeachers, useUserActions } from "src/stores/userStore";

const ClassManagement = () => {
	const { message } = App.useApp();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<ClassDto | null>(null);
	const [idSelectedGrade, setidSelectedGrade] = useState<number | null>(()=>{
		let idSelectedGradeInLocalStorage = localStorage.getItem("idSelectedGrade");
    	return idSelectedGradeInLocalStorage ? Number(idSelectedGradeInLocalStorage	) : null;
	})

	const listClasses = useClasses();
	const loading = useClassLoading();	
	const classActions = useClassActions();
	const listGrades = useGradees();
	const gradeActions =  useGradeActions();
	const totalClass = useTotalCountClass();
	const listTeachers = useTeachers();
	const userActions = useUserActions();

	const fetchClassAndTeacher = async (idSelectedGrade: number | null) => {
		await userActions.getAllTeacher();
		if(idSelectedGrade){ 
			await classActions.getClassByGrade(idSelectedGrade)
		}
		else await classActions.getAll(undefined, 0, 100);
	}
	const fetchGrade = async () => {
		await gradeActions.getAll(undefined,undefined,undefined);
	}
	useEffect ( () => {
		fetchGrade();
	}, []);

	useEffect(()=>{
		fetchClassAndTeacher(idSelectedGrade);
	},[idSelectedGrade])
	
	const optionGrade = useMemo(()=>{
		return(listGrades.map(item => ({
				value: item.id,
				label: item.gradeName
		})))
	},[listGrades])
	
	const handleOk = async (values: any) => {
		try {
			if (editingItem) {
				let item: UpdateClassDto = new UpdateClassDto();
				item.id = editingItem.id
				item.className = values.className;
				item.gradeId = values.gradeId;
				item.teacherId = values.teacherId;
				await classActions.update(item);
				message.success("Cập nhật thành công");
			} else {
				let item: CreateClassDto = new CreateClassDto();
				item.className = values.className;
				item.gradeId = values.gradeId;
				item.teacherId = values.teacherId;
				await classActions.create(item);
				message.success("Thêm mới thành công");
			}
			setIsModalOpen(false);
			await classActions.getAll(undefined, 0, 100);
		} catch (error) {
			message.error("Lỗi khi lưu");
		}
	};
	const onChangeSelectGrade = (value: number | undefined) => {
		console.log(value)
		if (value == undefined) {
			localStorage.removeItem("idSelectedGrade");
			setidSelectedGrade(null);
			return;
		}
		localStorage.setItem("idSelectedGrade", value.toString());
		setidSelectedGrade(value);
	}
	const onDeleteClass = async (id: number) => {
		await classActions.delete(id); 
		await classActions.getAll(undefined, 0, 100);
		message.success("Xóa lớp học thành công")
	}
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Quản lý lớp học</h2>
					<p className="text-gray-500">Thêm sửa xóa lớp học, thay đổi giáo viên và khối học</p>
				</Col>
				<Col>
					<Space.Compact>
						<Select 
							allowClear
							options={optionGrade}
							placeholder="Tìm kiếm theo khối học..."
							style={{width: '200px'}}
							value={idSelectedGrade}
							onChange={(value)=>onChangeSelectGrade(value)}
						/>
						<Button type="primary" icon={<SearchOutlined />} />
					</Space.Compact>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
						Thêm lớp học
					</Button>
				</Col>
				
			</div>
			<ClassTable 
				dataSource={listClasses} 
				loading={loading} 
				onEdit={(item: any) => { setEditingItem(item); setIsModalOpen(true); }} 
				onDelete={(id)=>onDeleteClass(id)} 
				totalClass={totalClass}
			/>
			<ClassModal 
				listGrades={listGrades}
				visible={isModalOpen} 
				editingItem={editingItem} 
				onOk={handleOk} 
				onCancel={() => setIsModalOpen(false)} 
				confirmLoading={loading} 
				listTeachers={listTeachers}
			/>
		</div>
	);
};

export default ClassManagement;