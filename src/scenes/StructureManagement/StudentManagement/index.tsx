import { useEffect, useState, useCallback } from "react";
import { Button, Card, Col, Space, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import { useStudentClasses, useStudentClassLoading, useStudentClassActions } from "src/stores/studentClassStore";
import { useClasses, useClassActions } from "src/stores/classStore";
import { useTeachers, useUsers, useUserActions, useStudents } from "src/stores/userStore";
import { CreateStudentClassDto, UpdateStudentClassDto, StudentClassDto } from "src/services/services_autogen";

const StudentManagement = () => {
	const { message } = App.useApp();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<StudentClassDto | null>(null);

	const listStudentClasses = useStudentClasses();
	const loading = useStudentClassLoading();
	const studentClassActions = useStudentClassActions();
	
	const listClasses = useClasses();
	const classActions = useClassActions();
	
	const listTeachers = useTeachers();
	const listStudents = useStudents();
	const userActions = useUserActions();

	const fetchAllData = useCallback(async () => {
		await classActions.getAll(undefined, 0, 100);
		await userActions.getRoles();
		await userActions.getAllStudent();
		await userActions.getAllTeacher();
		await studentClassActions.getAll(undefined, 0, 100);
	}, [studentClassActions, classActions, userActions]);

	useEffect(() => {
		fetchAllData();
	}, [fetchAllData]);

	const handleOk = async (values: Record<string, unknown>) => {
		try {
			if (editingItem) {
				const item: UpdateStudentClassDto = new UpdateStudentClassDto();
				item.id = editingItem.id;
				item.classId = values.classId as number;
				item.studentId = values.studentId as number;
				await studentClassActions.update(item);
				message.success("Cập nhật thành công");
			} else {
				const item: CreateStudentClassDto = new CreateStudentClassDto();
				item.classId = values.classId as number;
				item.studentId = values.studentId as number;
				await studentClassActions.create(item);
				message.success("Thêm mới thành công");
			}
			setIsModalOpen(false);
			await fetchAllData();
		} catch {
			message.error("Lỗi khi lưu");
		}
	};

	const onDeleteStudentClass = async (id: number) => {
		try {
			await studentClassActions.delete(id);
			await fetchAllData();
			message.success("Xóa thành công");
		} catch {
			message.error("Lỗi khi xóa");
		}
	};

	const handleAddNew = () => {
		setEditingItem(null);
		setIsModalOpen(true);
	};

	const handleEdit = (record: StudentClassDto) => {
		setEditingItem(record);
		setIsModalOpen(true);
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={8}>
					<h2 className="text-2xl font-bold text-gray-800">Quản lý học sinh lớp học</h2>
					<p className="text-gray-500">Quản lý danh sách học sinh trong các lớp</p>
				</Col>
				<Col>
					<Space.Compact>
						<Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
							Thêm mới
						</Button>
					</Space.Compact>
				</Col>
			</div>

			<Card>
				<StudentTable
					dataSource={listStudentClasses}
					loading={loading}
					onEdit={handleEdit}
					onDelete={onDeleteStudentClass}
					totalStudent={listStudentClasses.length}
					listClasses={listClasses}
					listTeachers={listTeachers}
					listStudents={listStudents}
				/>
			</Card>

			<StudentModal
				visible={isModalOpen}
				editingItem={editingItem}
				onOk={handleOk}
				onCancel={() => setIsModalOpen(false)}
				confirmLoading={loading}
				listClasses={listClasses}
				listStudents={listStudents}
			/>
		</div>
	);
};

export default StudentManagement;
