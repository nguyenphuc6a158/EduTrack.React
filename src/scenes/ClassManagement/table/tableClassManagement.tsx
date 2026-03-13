import { Table } from "antd";
import React from "react";
import type { ClassDto } from "../../../services/services_autogen";
interface ITableClassManagementProps {
	listClass: ClassDto[];
}
export default class TableClassManagement extends React.Component<ITableClassManagementProps> {
	render() {
		const { listClass } = this.props;
		const columns = [
			{
				title: "Mã lớp học",
				dataIndex: "classId",
				key: "classId"
			},
			{
				title: "Tên lớp học",
				dataIndex: "className",
				key: "className"
			},
			{
				title: "Khối lớp",
				dataIndex: "level",
				key: "level"
			},
		];

		return(
			<Table 
				columns={columns}
				dataSource={listClass}
				rowKey="classId"
				pagination={false}
			/>
		)
	}
}