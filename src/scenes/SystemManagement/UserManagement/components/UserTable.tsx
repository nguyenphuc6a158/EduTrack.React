import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { UserDto } from "src/services/services_autogen";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface UserTableProps {
    users: UserDto[];
    loading: boolean;
    total: number;
    onEdit: (user: UserDto) => void;
    onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, total, onEdit, onDelete }) => {
    const columns = [
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            sorter: true,
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email Address",
            dataIndex: "emailAddress",
            key: "emailAddress",
        },
        {
            title: "Is Active",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive: boolean) => (
                <Tag color={isActive ? "green" : "red"}>
                    {isActive ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Creation Time",
            dataIndex: "creationTime",
            key: "creationTime",
            render: (date: Date) => (date ? new Date(date).toLocaleString() : "-"),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: UserDto) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Delete user?"
                        description="Are you sure you want to delete this user?"
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
            dataSource={users}
            columns={columns}
            loading={loading}
            pagination={{
                position: ["topRight"],
                total: total,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} users`,
            }}
        />
    );
};

export default UserTable;
