import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface RoleTableProps {
    roles: any[];
    loading: boolean;
    onEdit: (role: any) => void;
    onDelete: (id: number) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: "Role Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Display Name",
            dataIndex: "displayName",
            key: "displayName",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Delete role?"
                        description="Are you sure you want to delete this role?"
                        onConfirm={() => onDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="id"
            dataSource={roles}
            columns={columns}
            loading={loading}
            pagination={{
                position: ["topRight"],
                pageSize: 10,
                showSizeChanger: true,
            }}
        />
    );
};

export default RoleTable;
