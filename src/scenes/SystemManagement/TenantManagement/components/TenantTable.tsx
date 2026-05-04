import React from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { TenantDto } from "src/services/services_autogen";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ResponsiveLayout } from "src/lib/appconst";

interface TenantTableProps {
    tenants: TenantDto[];
    loading: boolean;
    total: number;
    onEdit: (tenant: TenantDto) => void;
    onDelete: (id: number) => void;
}

const TenantTable: React.FC<TenantTableProps> = ({ tenants, loading, total, onEdit, onDelete }) => {
    const columns = [
        {
            title: "Tenancy Name",
            dataIndex: "tenancyName",
            key: "tenancyName",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
            title: "Action",
            key: "action",
            render: (_: any, record: TenantDto) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Delete tenant?"
                        description="Are you sure you want to delete this tenant?"
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
            dataSource={tenants}
            columns={columns}
            loading={loading}
            scroll={{ x: ResponsiveLayout.tableScrollX }}
            pagination={{
                position: ["topRight"],
                total: total,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} tenants`,
            }}
        />
    );
};

export default TenantTable;
