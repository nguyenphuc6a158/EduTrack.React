import React, { useState } from "react";
import { Modal, Upload, Button, Table, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload";
import { ResponsiveLayout } from "src/lib/appconst";

interface IImportStudentModalProps {
    visible: boolean;
    onCancel: () => void;
    // onImport?: (data: never[]) => void;
    confirmLoading?: boolean;
}

const ImportStudentModal: React.FC<IImportStudentModalProps> = ({ 
    visible, 
    onCancel, 
    // onImport,
    confirmLoading = false
}) => {
    // const [fileData, setFileData] = useState<any[]>([]);

    const handleFileUpload = (file: RcFile) => {
        
        
    };

    const columns = [
        {
            title: "Tên lớp học",
            dataIndex: "className",
            key: "className",
            width: 150,
        },
        {
            title: "Tên học sinh",
            dataIndex: "studentName",
            key: "studentName",
            width: 150,
        },
    ];

    // const handleImport = () => {
    //     if (fileData.length === 0) {
    //         message.error("Vui lòng chọn tệp để tải lên");
    //         return;
    //     }
    //     onImport?.(fileData);
    //     setFileData([]);
    // };

    return (
        <Modal
            title="Tải lên danh sách học sinh"
            open={visible}
            onCancel={() => {
                // setFileData([]);
                onCancel();
            }}
            width={ResponsiveLayout.modalWidth.xl}
            footer={[
                <Button key="cancel" onClick={() => {
                    // setFileData([]);
                    onCancel();
                }}>
                    Hủy
                </Button>,
                // <Button 
                //     key="import" 
                //     type="primary" 
                //     loading={confirmLoading}
                //     onClick={handleImport}
                //     disabled={fileData.length === 0}
                // >
                //     Import
                // </Button>,
            ]}
        >
            <div>
                <div style={{ marginBottom: 24 }}>
                    <h4>Chọn file Excel/CSV</h4>
                    <Upload
                        maxCount={1}
                        accept=".xlsx,.xls,.csv"
                        beforeUpload={handleFileUpload}
                    >
                        <Button icon={<UploadOutlined />}>
                            Chọn file
                        </Button>
                    </Upload>
                    <p style={{ marginTop: 8, color: '#666', fontSize: 12 }}>

                    </p>
                </div>

                {/* {fileData.length > 0 && (
                    <div>
                        <h4> Xem trước dữ liệu</h4>
                        <Table
                            columns={columns}
                            dataSource={fileData.map((item, index) => ({ ...item, key: index }))}
                            pagination={{ pageSize: 5 }}
                            size="small"
                        />
                    </div>
                )} */}
            </div>
        </Modal>
    );
};

export default ImportStudentModal;

