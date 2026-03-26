import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GradeDto } from "src/services/services_autogen";

interface GradeTableProps {
    dataSource: GradeDto[];
    loading: boolean;
    onEdit: (grade: GradeDto) => void;
    onDelete: (id: number) => void;
}

const GradeTable: React.FC<GradeTableProps> = ({ dataSource, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: "Tên khối lớp",
            dataIndex: "gradeName",
            key: "gradeName",
            sorter: (a: any, b: any) => a.gradeName.localeCompare(b.gradeName),
        },    
        {
            title: "Hành động",
            key: "action",
            width: 150,
            render: (_: any, record: GradeDto) => (
                <Space size="middle">
                    <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>Sửa</Button>
                    <Popconfirm 
                        title="Xóa khối lớp này?" 
                        onConfirm={() => onDelete(record.id as any)}
                        okText="Xóa" cancelText="Hủy"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default GradeTable;