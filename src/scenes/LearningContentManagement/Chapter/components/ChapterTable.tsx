import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import type React from "react";
import type { ChapterDto } from "src/services/services_autogen";
interface IChapterProps {
	listChapter: ChapterDto[],
	onDelete: (id: number) => void,
	onEdit: (item: ChapterDto) => void,
	totalChapter: number
}
const ChapterTable : React.FC<IChapterProps> = ({listChapter, onDelete, onEdit, totalChapter}) => {
	const colums = [
		{
			title:"Tên chương",
			dataIndex:"chapterName"
		},
		{
			title:"Hành động",
			render: (record: ChapterDto) => {
				return(
					<Space size="middle">
						<Button
							title="Chỉnh sửa"
							type="text"
							icon={<EditOutlined />}
							onClick={() => onEdit(record)}
						/>
						<Popconfirm
							title="Xóa môn học?"
							description="Bạn có chắc chắn muốn xóa môn học này không?"
							onConfirm={() => onDelete(record.id)}
							okText="Xóa"
							cancelText="Hủy"
						>
							<Button
								title="Xóa môn học"
								type="text"
								danger
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</Space>
				)
			}
		}
	]
	return(
		<Table 
			columns={colums}
			dataSource={listChapter}
			pagination={{
				placement: ["topEnd"],
				total: totalChapter,
				pageSize: 10,
				showSizeChanger: true,
				showTotal: (totalChapter) => `Tổng: ${totalChapter}`,
			}}
			rowKey={"id"}
		/>
	)
}
export default ChapterTable