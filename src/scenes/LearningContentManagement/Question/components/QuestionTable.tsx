import { DeleteOutlined, EditOutlined, InfoCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import type React from "react";
import { useMemo } from "react";
import { AppConsts } from "src/lib/appconst";
import { ModeTableQuestionsEnum } from "src/lib/enum";
import type { QuestionDto } from "src/services/services_autogen";
interface IQuestionTableProps{
	listQuestions: QuestionDto[];
	onDelete: (item: QuestionDto) => void;
	onEdit: (selectedQuestion: QuestionDto) => void;
	openInforQuestionModal: (selectedQuestion: QuestionDto) => void;
	loading?: boolean;
	totalCountQuestion?: number;
	tableMode?: ModeTableQuestionsEnum;
	pushSelectedQuestion?: (selectedItems: QuestionDto) => void;
	onDoubleClick?: (question: QuestionDto) => void;
	removeSelectedQuestion?: (questionId: number) => void;
}
const QuestionTable: React.FC<IQuestionTableProps> = ({listQuestions, onDelete, onEdit, openInforQuestionModal, loading, totalCountQuestion, tableMode, pushSelectedQuestion, onDoubleClick, removeSelectedQuestion}) => {
	const formatFileName = (fileName: string) => {
		const parts = fileName.split("_");
		if (parts.length > 1) {
			const lastPart = parts[parts.length - 1];
			if (lastPart.includes("-")) {
				return parts.slice(0, -1).join("_") + "." + lastPart.split(".").pop();
			}
		}
		return fileName;
	};
	const filterListFileUrlOptions = useMemo(() => {
		return [... new Set(listQuestions.flatMap(question => question.fileUrlAssignment))].map(fileUrl => ({
			text: formatFileName(fileUrl ? (fileUrl.split("/").pop() || "") : ""),
			value: fileUrl || "",
		}));
	}, [listQuestions]);
	const filterListDifficulityLevelOptions = useMemo(() => {
		return [... new Set(listQuestions.flatMap(question => question.difficultyLevel))].map(difficultyLevel => ({
			text: difficultyLevel,
			value: difficultyLevel || -1,
		}));
	}, [listQuestions]);
	const filterListChapterOptions = useMemo(() => {
		return [... new Set(listQuestions.flatMap(question => question.chapterName))].map(chapterName => ({
			text: chapterName,
			value: chapterName || "",
		}));
	}, [listQuestions]);
	const columns = useMemo(() => [
		{
			title:'Nội dung câu hỏi',
			dataIndex:'fileUrlAssignment',
			key:'fileUrlAssignment',
			width: 500,
			filters:filterListFileUrlOptions,
			onFilter: (value:any, record: QuestionDto) =>record.fileUrlAssignment === value,
			filterSearch: true,
			render: (text: string) =>{
				let splitContent = text.split("/");
				return(
					<a href={AppConsts.remoteServiceBaseUrl + text} target="_blank" rel="noopener noreferrer">
						{formatFileName(splitContent[splitContent.length - 1])}
					</a>
				)
			}
		},
		{
			title:'Độ khó',
			dataIndex:'difficultyLevel',
			key:'difficultyLevel',
			sorter: (a: QuestionDto, b: QuestionDto) => a.difficultyLevel - b.difficultyLevel,
			filters:filterListDifficulityLevelOptions,
			filterSearch: true,
			onFilter: (value:any, record: QuestionDto) =>record.difficultyLevel === value,
		},
		{
			title:'Chương',
			dataIndex:'chapterName',
			key:'chapterName',
			filters:filterListChapterOptions,
			filterSearch: true,
			onFilter: (value:any, record: QuestionDto) =>record.chapterName === value,
		},
	],[]);
	const actionColumn = [
		{
			title:'Hành động',
			width: 200,
			align: "center" as const,
			render: (record: QuestionDto) => {
				return(
					<Space size="middle">
						<Button
							title="Chỉnh sửa"
							type="text"
							icon={<EditOutlined />}
							onClick={() => onEdit(record)}
						/>
						<Button
							title="Xem chi tiết"
							type="text"
							icon={<InfoCircleOutlined />}
							onClick={() => openInforQuestionModal(record)}
						/>
						<Popconfirm
							title="Xóa môn học?"
							description="Bạn có chắc chắn muốn xóa môn học này không?"
							onConfirm={() => onDelete(record)}
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
	const actionPopQuestion = [
		{
			title:'Hành động',
			align: "center" as const,
			render: (record: QuestionDto) => {
				return (
					<Space>
						<Button
							title="Bỏ chọn"
							type="text"
							icon={<RollbackOutlined />}
							onClick={() => removeSelectedQuestion && removeSelectedQuestion(record.id)}
						/>
						<Button
							title="Xem chi tiết"
							type="text"
							icon={<InfoCircleOutlined />}
							onClick={() => openInforQuestionModal(record)}
						/>
					</Space>
				)
			}
		}
	]
	const finalColumns = useMemo(() => {
		if(tableMode == ModeTableQuestionsEnum.QUESTION){
			return  [...columns, ...actionColumn];
		} else if (tableMode == ModeTableQuestionsEnum.ASSIGNMENT_SELECTED){
			return [...columns, ...actionPopQuestion];
		} else {
			return columns;
		}
	}, [tableMode, columns, actionColumn, actionPopQuestion])
	return(
		<Table
			columns={finalColumns}
			dataSource={listQuestions}
			rowKey={"id"}
			loading={loading}
			onRow={(record) => {
				return {
					onClick: () => pushSelectedQuestion && pushSelectedQuestion(record),
					onDoubleClick: () => onDoubleClick && onDoubleClick(record)
				};
			}}
			pagination={
				tableMode ? false :
				{
					placement: ["topEnd"],
					total: totalCountQuestion,
					pageSize: 10,
					showSizeChanger: true,
					showTotal: (totalCountQuestion) => `Tổng: ${totalCountQuestion}`,
				}
			}
		/>
	)
}
export default QuestionTable