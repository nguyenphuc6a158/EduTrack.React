import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GradeTable from "./components/GradeTable";
import GradeModal from "./components/GradeModal";
import { 
    useGradees, 
    useGradeLoading, 
    useGradeActions, 
    useTotalCountGrade
} from "src/stores/gradeStore"; 
import { CreateGradeDto, GradeDto, UpdateGradeDto } from "src/services/services_autogen";

const GradeManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGrade, setEditingGrade] = useState<GradeDto | null>(null);
    const totalGrade = useTotalCountGrade()
    const listGrades = useGradees();
    const loading = useGradeLoading();
    const gradeActions = useGradeActions();

    const fetchData = async () => {
        gradeActions.getAll(undefined, 0, 100);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleOk = async (values: any) => {
    try {
        if (editingGrade) {
            let item: UpdateGradeDto = new UpdateGradeDto();
            item.id = editingGrade.id;
            item.gradeName = values.gradeName;
            await gradeActions.update(item);
            message.success("Cập nhật thành công");
        } else {
            let item: CreateGradeDto = new CreateGradeDto();
            item.gradeName = values.gradeName;
            await gradeActions.create(item);
            message.success("Thêm mới thành công");
        }
        setIsModalOpen(false);
        fetchData(); 
        } catch (error) {
            message.error("Lưu thất bại, vui lòng kiểm tra lại");
        }
    };
    const handleDelete = async (id: number) => {
        try {
            await gradeActions.delete(id);
            message.success("Xóa khối lớp thành công");
            fetchData();
        } catch (error) {
            message.error("Không thể xóa khối lớp này");
        }
    };

    return (
        <div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Quản lý khối học</h2>
					<p className="text-gray-500">Thêm sửa xóa khối học</p>
				</div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingGrade(null); setIsModalOpen(true); }}>
                    Thêm khối lớp
                </Button>
            </div>
            <GradeTable 
                dataSource={listGrades} 
                loading={loading}
                onEdit={(record) => { setEditingGrade(record); setIsModalOpen(true); }} 
                onDelete={handleDelete} 
                totalGrade={totalGrade}
            />
            <GradeModal 
                visible={isModalOpen} 
                editingGrade={editingGrade} 
                onOk={handleOk} 
                onCancel={() => setIsModalOpen(false)} 
                confirmLoading={loading}
            />
        </div>
    );
};

export default GradeManagement;