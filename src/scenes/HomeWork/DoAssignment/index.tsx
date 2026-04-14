import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select, Space } from "antd";
import type React from "react";
import { useMemo, useState } from "react";
import { useAssignmentActions, useAssignments } from "src/stores/assignmentStore";
import { useChapterActions, useChapters } from "src/stores/chapterStore";

const DoAssignment: React.FC = () => {
	const asignmentActions = useAssignmentActions();
	const listAssignment = useAssignments();
	const chapterActions = useChapterActions();
	const listChapter = useChapters();

	const userId = Number(localStorage.getItem("userId"));
	const [selectedChapterId, setSelectedChapterId] = useState<number | undefined> (undefined)
	const fetchAssigment = async () => {
		await asignmentActions.getAllAssignmentForStudent(userId,selectedChapterId)
	}
	const optionSelectChapter = useMemo(()=>{
		return listChapter.map(item=>({
			value: item.id,
			label: item.chapterName || "",
		}))
	},[listChapter])
	const onchangeChapterSelected =(chapterSelectedId: number) => {
		setSelectedChapterId(selectedChapterId);
	}
	return (
		<div className="p-6">
			<Col className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Làm bài tập</h2>
				</div>
			</Col>
			<Col>
				<Space.Compact>
					<Select
						allowClear
						value={selectedChapterId}
						onChange={(item) => onchangeChapterSelected(item)}
						options={optionSelectChapter}
						placeholder="Tìm kiếm theo môn học..."
						style={{ width: "200px" }}
					/>
					<Button type="primary" icon={<SearchOutlined />} />
				</Space.Compact>
			</Col>
		</div>
	);
};

export default DoAssignment;