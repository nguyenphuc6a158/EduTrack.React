import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Select, Space } from "antd";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useAssignmentActions, useAssignments, useDetailAssignmentForStudents } from "src/stores/assignmentStore";
import { useChapterActions, useChapters } from "src/stores/chapterStore";
import ListAssignmentGridView from "./components/ListAssignmentGridView";
import { useNavigate } from "react-router-dom";
import { useQuestionActions, useSelectedAssimentId } from "src/stores/questionStore";

const DoAssignment: React.FC = () => {
	const asignmentActions = useAssignmentActions();
	const listDetailAssignmentForAssignment = useDetailAssignmentForStudents();
	const chapterActions = useChapterActions();
	const listChapter = useChapters();
	const questionActions = useQuestionActions();
	const userId = localStorage.getItem("userId");
	const [selectedChapterId, setSelectedChapterId] = useState<number | undefined>
	(localStorage.getItem("selectedChapterId") ? Number(localStorage.getItem("selectedChapterId")) : undefined);

	const navigate = useNavigate();

	const fetchChapter = async () => {
		try {
			await chapterActions.getAll();
		} catch (error) {
			console.error("Cannot load chapters:", error);
		}
	};
	useEffect(() => {
		fetchChapter();
	}, [chapterActions]);

	useEffect(() => {
		fetchAssignmentForStudent();
	},[selectedChapterId])

	const fetchAssignmentForStudent = async () => {
		if (!userId || !selectedChapterId) {
			return;
		}
		try {
			await asignmentActions.getAllAssignmentForStudent(Number(userId), selectedChapterId);
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
	const choseAssignment = (selectedDetailAssignmentId: number) =>{
		questionActions.setSelectedAssimentId(selectedDetailAssignmentId);
		navigate("/detail-assignment");
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
						onChange={(item) => onChangeChapterSelected(item)}
						options={optionSelectChapter}
						placeholder="Lọc theo chương..."
						style={{ width: "200px" }}
					/>
					<Button type="primary" icon={<SearchOutlined />} onClick={fetchAssignmentForStudent} />
				</Space.Compact>
			</Col>
			<Col className="mt-6">
				<ListAssignmentGridView 
					listDetailAssignmentForAssignment={listDetailAssignmentForAssignment}
					choseAssignment={choseAssignment}
				/>
			</Col>
		</div>
	);
};

export default DoAssignment;