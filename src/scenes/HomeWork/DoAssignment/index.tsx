import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Select, Space } from "antd";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useAssignmentActions, useAssignments } from "src/stores/assignmentStore";
import { useChapterActions, useChapters } from "src/stores/chapterStore";

const DoAssignment: React.FC = () => {
	const asignmentActions = useAssignmentActions();
	const listAssignment = useAssignments();
	const chapterActions = useChapterActions();
	const listChapter = useChapters();

	const userId = localStorage.getItem("userId");
	const [selectedChapterId, setSelectedChapterId] = useState<number | undefined>
	(localStorage.getItem("selectedChapterId") ? Number(localStorage.getItem("selectedChapterId")) : undefined);
	const fetchChapter = async () => {
		try {
			await chapterActions.getAll();
		} catch (error) {
			console.error("Cannot load chapters:", error);
		}
	};
	const fetchAssignmentForStudent = async () => {
		if (!userId || !selectedChapterId) {
			return;
		}
		await asignmentActions.getAllAssignmentForStudent(Number(userId), selectedChapterId, undefined, 0, 10);
	}
	useEffect(() => {
		fetchChapter();
	}, [chapterActions]);

	const fetchAssigment = async () => {
		if (!selectedChapterId) {
			return;
		}
		try {
			await asignmentActions.getAllAssignmentForStudent(Number(userId), selectedChapterId, undefined, 0, 10);
		} catch (error) {
			console.error("Cannot load student assignments:", error);
		}
	};

	const optionSelectChapter = useMemo(() => {
		return listChapter.map((item) => ({
			value: item.id,
			label: item.chapterName || "",
		}));
	}, [listChapter]);

	const onChangeChapterSelected = (chapterSelectedId: number | undefined) => {
		setSelectedChapterId(chapterSelectedId);
		if ( chapterSelectedId != null || chapterSelectedId == undefined) {
			localStorage.setItem("selectedChapterId",chapterSelectedId?.toString() || "");
		} else {
			localStorage.removeItem("selectedChapterId");
		}
	};

	const gridAssignments = useMemo(() => listAssignment.slice(0, 10), [listAssignment]);

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
						onChange={(item) => onChangeChapterSelected(item)}
						options={optionSelectChapter}
						placeholder="Lọc theo chương..."
						style={{ width: "200px" }}
					/>
					<Button type="primary" icon={<SearchOutlined />} onClick={fetchAssigment} />
				</Space.Compact>
			</Col>
			<Col className="mt-6">
				<div className="grid grid-cols-5 gap-4">
					{gridAssignments.map((assignment) => (
						<Card
							key={assignment.id}
							title={assignment.title || "Bai tap"}
							className="h-full"
							size="small"
						>
							<p className="text-gray-500 mb-0">{assignment.chapterName || "Chua co chuong"}</p>
						</Card>
					))}
				</div>
			</Col>
		</div>
	);
};

export default DoAssignment;