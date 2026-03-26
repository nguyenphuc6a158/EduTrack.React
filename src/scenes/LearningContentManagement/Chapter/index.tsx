import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Select } from "antd";
import type React from "react";

const ChapterManagement: React.FC = ()=>{
	const openAddModal = () => {

	}
	return(
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Chương</h2>
					<p className="text-gray-500">Chương trình học</p>
				</Col>
				<Col >
					<Select placeholder="Chọn môn học"/>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={openAddModal}
						size="large"
					>
						Thêm chương
					</Button>
				</Col>
			</div>
		</div>
	)
}
export default ChapterManagement