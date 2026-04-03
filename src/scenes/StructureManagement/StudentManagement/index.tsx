import { useEffect, useMemo, useState } from "react";
import { Button, Col, Space, Select, App } from "antd";
import { PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import ImportStudentModal from "./components/ImportStudentModal";
import { useStudentClasses, useStudentClassLoading, useStudentClassActions, useTotalCountStudentClass } from "src/stores/studentClassStore";
import { useClasses, useClassActions } from "src/stores/classStore";
import { useUserActions, useStudents } from "src/stores/userStore";
import { CreateStudentClassDto, UpdateStudentClassDto, StudentClassDto } from "src/services/services_autogen";

const StudentManagement = () => {
	const { message } = App.useApp();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isImportModalOpen, setIsImportModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<StudentClassDto | null>(null);
	const [idSelectedClass, setIdSelectedClass] = useState<number | null>(()=>{
		let idSelectedClassInLocalStorage = localStorage.getItem("idSelectedClass");
    	return idSelectedClassInLocalStorage ? Number(idSelectedClassInLocalStorage	) : null;
	})

	const listStudentClasses = useStudentClasses();
	const loading = useStudentClassLoading();	
	const studentClassActions = useStudentClassActions();
	const listClasses = useClasses();
	const classActions = useClassActions();
	const listStudents = useStudents();
	const userActions = useUserActions();
	const totalStudentClass = useTotalCountStudentClass();
	const [importLoading, setImportLoading] = useState(false);

	const fetchStudentsByClass = async (idSelectedClass: number | null) => {
		if(idSelectedClass){ 
			await studentClassActions.getStudentClassByClass(idSelectedClass)
		}
		else await studentClassActions.getAll(undefined, 0, 100);
	}
	const fetchClass = async () => {
		await classActions.getAll(undefined, 0, 100);
		await userActions.getAllStudent();
	}
	useEffect ( () => {
		fetchClass();
	}, []);

	useEffect(()=>{
		fetchStudentsByClass(idSelectedClass);
	},[idSelectedClass])

	
	const optionClass = useMemo(()=>{
		return(listClasses.map(item => ({
				value: item.id,
				label: item.className
		})))
	},[listClasses])
	
	const handleOk = async (values: any) => {
		try {
			if (editingItem) {
				let item: UpdateStudentClassDto = new UpdateStudentClassDto();
				item.id = editingItem.id
				item.classId = values.classId;
				item.studentId = values.studentId;
				await studentClassActions.update(item);
				message.success("Cập nhật thành công");
			} else {
				let item: CreateStudentClassDto = new CreateStudentClassDto();
				item.classId = values.classId;
				item.studentId = values.studentId;
				await studentClassActions.create(item);
				message.success("Thêm mới thành công");
			}
			setIsModalOpen(false);
			await fetchStudentsByClass(idSelectedClass);
		} catch (error) {
			message.error("Học sinh này đã có trong lớp");
		}
	};
	const onChangeSelectClass = (value: number | undefined) => {
		console.log(value)
		if (value == undefined) {
			localStorage.removeItem("idSelectedClass");
			setIdSelectedClass(null);
			return;
		}
		localStorage.setItem("idSelectedClass", value.toString());
		setIdSelectedClass(value);
	}
	const onDeleteStudentClass = async (id: number) => {
		await studentClassActions.delete(id); 
		await fetchStudentsByClass(idSelectedClass);
		message.success("Xóa học sinh khỏi lớp thành công")
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Quản lý học sinh lớp học</h2>
					<p className="text-gray-500">Quản lý danh sách học sinh trong các lớp học</p>
				</Col>
				<Col>
					<Space.Compact>
						<Select 
							allowClear
							options={optionClass}
							placeholder="Tìm kiếm theo lớp học..."
							style={{width: '200px'}}
							value={idSelectedClass}
							onChange={(value)=>onChangeSelectClass(value)}
						/>
						<Button type="primary" icon={<SearchOutlined />} />
					</Space.Compact>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button type="primary" icon={<UploadOutlined />} onClick={() => setIsImportModalOpen(true)}>
						Tải lên tệp 
					</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
						Thêm học sinh
					</Button>
				</Col>
				
			</div>
			<StudentTable 
				dataSource={listStudentClasses} 
				loading={loading} 
				onEdit={(item: any) => { setEditingItem(item); setIsModalOpen(true); }} 
				onDelete={(id)=>onDeleteStudentClass(id)} 
				totalStudent={totalStudentClass}
				listClasses={listClasses}
				listStudents={listStudents}
			/>
			<StudentModal 
				listClasses={listClasses}
				visible={isModalOpen} 
				editingItem={editingItem} 
				onOk={handleOk} 
				onCancel={() => setIsModalOpen(false)} 
				confirmLoading={loading} 
				listStudents={listStudents}
			/>
			<ImportStudentModal
				visible={isImportModalOpen}
				onCancel={() => setIsImportModalOpen(false)}
				confirmLoading={importLoading}
			/>
		</div>
	);
};

export default StudentManagement;
