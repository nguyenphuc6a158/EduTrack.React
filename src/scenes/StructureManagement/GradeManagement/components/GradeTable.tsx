import React, { useMemo } from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GradeDto } from "src/services/services_autogen";
import { ResponsiveLayout } from "src/lib/appconst";

interface GradeTableProps {
    dataSource: GradeDto[];
    loading: boolean;
    onEdit: (grade: GradeDto) => void;
    onDelete: (id: number) => void;
    totalGrade: number;
}

const GradeTable: React.FC<GradeTableProps> = ({ dataSource, loading, onEdit, onDelete, totalGrade }) => {
    const filters = useMemo(()=>{
        return [...new Set(dataSource?.flatMap(dataSource => dataSource.gradeName || []))].map(item=>{
            return({
                value: item,
                text: item || "",
            })
        })
    },[dataSource]);

    const columns = [
        {
            title: "Tên khối lớp",
            dataIndex: "gradeName",
            key: "gradeName",
            sorter: (a: GradeDto, b: GradeDto) => {
                const nameA = a.gradeName || "";
                const nameB = b.gradeName || "";
                return nameA.localeCompare(nameB);
            },
            filters: filters,
            filterSearch: true,
            onFilter: (value: any, record: GradeDto) => (record.gradeName || "").includes(String(value)),
        },
        {
            title: "Hành động",
            key: "action",
            width: 200,
			align: "center" as const,
            render: (_: any, record: GradeDto) => (
                <Space size="middle">
                    <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}></Button>
                    <Popconfirm 
                        title="Xóa khối lớp này?" 
                        onConfirm={() => onDelete(record.id)}
                        okText="Xóa" cancelText="Hủy"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}></Button>
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
            scroll={{ x: ResponsiveLayout.tableScrollX }}
            pagination={{ 
                placement: ["topEnd"],
                pageSize: 10,
                showSizeChanger: true,
                total: totalGrade,
                showTotal: (totalGrade) => `Tổng: ${totalGrade}`,
            }}
        />
    );
};

export default GradeTable;