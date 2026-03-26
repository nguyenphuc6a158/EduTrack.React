import { useEffect, useState } from "react";
import { Button, message, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ClassTable from "./components/ClassTable"; 
import ClassModal from "./components/ClassModal";
import { useGradeActions, useGradees } from "src/stores/gradeStore";
import { useClassActions, useClasses, useClassLoading } from "src/stores/classStore";

const ClassManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null); 

    const listClasses = useClasses();
    const loading = useClassLoading();
    const { getAll, create, update, delete: deleteClass } = useClassActions();
    const listGrades = useGradees();
    const getAllGrades =  useGradeActions().getAll;

    const fetchData = async() => {
        await getAll("", 0, 100).catch(() => message.error("Lỗi tải dữ liệu"));
        await getAllGrades(undefined,undefined,undefined);
        console.log(listGrades);
    }

    useEffect ( () => {
        fetchData();
    }, []);

    const handleOk = async (values: any) => {
        try {
            if (editingItem) {
                await update({ ...editingItem, ...values });
                message.success("Cập nhật thành công");
            } else {
                await create(values);
                message.success("Thêm mới thành công");
            }
            setIsModalOpen(false);
            fetchData(); 
        } catch (error) {
            message.error("Lỗi khi lưu");
        }
    };

    return (
        <Card title={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <b>Quản lý Lớp học</b>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
                    Thêm lớp học
                </Button>
            </div>
        }>
            <ClassTable 
                dataSource={listClasses} 
                loading={loading} 
                onEdit={(item: any) => { setEditingItem(item); setIsModalOpen(true); }} 
                onDelete={async (id: number) => { await deleteClass(id); fetchData(); }} 
            />
            <ClassModal 
                listGrades={listGrades}
                visible={isModalOpen} 
                editingItem={editingItem} 
                onOk={handleOk} 
                onCancel={() => setIsModalOpen(false)} 
                confirmLoading={loading} 
            />
        </Card>
    );
};

export default ClassManagement;