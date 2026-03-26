import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ClassTable = ({ dataSource, loading, onEdit, onDelete }: any) => {
    const columns = [
        {
            title: "Tên lớp học",
            dataIndex: "className", 
            key: "className",
        },
        {
            title: "Khối học", 
            dataIndex: "gradeId",
            key: "gradeId",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>Sửa</Button>
                    <Popconfirm title="Xóa lớp học này?" onConfirm={() => onDelete(record.id)}>
                        <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={dataSource} rowKey="id" loading={loading} />;
};

export default ClassTable;