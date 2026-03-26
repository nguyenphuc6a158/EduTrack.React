import React, { useEffect, useState } from "react";
import { Button, message, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GradeTable from "./components/GradeTable";
import GradeModal from "./components/GradeModal";
import { 
    useGradees, 
    useGradeLoading, 
    useGradeActions 
} from "src/stores/gradeStore"; 

const GradeManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGrade, setEditingGrade] = useState<any>(null);

    const listGrades = useGradees();
    const loading = useGradeLoading();
    const { getAll, create, update, delete: deleteGrade } = useGradeActions();

    const fetchData = () => getAll("", 0, 100);

    useEffect(() => {
        fetchData();
    }, []);

    const handleOk = async (values: any) => {
    try {
        if (editingGrade) {
            await update({ 
                ...editingGrade, 
                ...values 
            });
            message.success("Cập nhật thành công");
        } else {
            await create(values);
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
            await deleteGrade(id);
            message.success("Xóa khối lớp thành công");
            fetchData();
        } catch (error) {
            message.error("Không thể xóa khối lớp này");
        }
    };

    return (
        <Card title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Quản lý Khối lớp</span>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingGrade(null); setIsModalOpen(true); }}>
                    Thêm khối lớp
                </Button>
            </div>
        }>
            <GradeTable 
                dataSource={listGrades} 
                loading={loading}
                onEdit={(record) => { setEditingGrade(record); setIsModalOpen(true); }} 
                onDelete={handleDelete} 
            />
            <GradeModal 
                visible={isModalOpen} 
                editingGrade={editingGrade} 
                onOk={handleOk} 
                onCancel={() => setIsModalOpen(false)} 
                confirmLoading={loading}
            />
        </Card>
    );
};

export default GradeManagement;