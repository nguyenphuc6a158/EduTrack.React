import { Col } from "antd";
import type React from "react";

const AssignmentManagement: React.FC = () =>{
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Bài tập</h2>
					<p className="text-gray-500">Thêm sửa xóa bài tập</p>
				</Col>
			</div>
		</div>
	)
}
export default AssignmentManagement