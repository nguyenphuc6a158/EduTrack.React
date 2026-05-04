import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Select, Space } from "antd";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useAssignmentActions, useAssignments, useDetailAssignmentForStudents } from "src/stores/assignmentStore";
import { useChapterActions, useChapters } from "src/stores/chapterStore";
import ListAssignmentGridView from "./components/ListAssignmentGridView";
import { useNavigate } from "react-router-dom";
import { useQuestionOptionActions } from "src/stores/questionOptionStore";
import { useAssignmentQuestionActions } from "src/stores/assignmentQuestionStore";
import { useStudentAssignmentActions } from "src/stores/studentAssignmentStore";
import DounutChart from "src/scenes/Dashboard/donutChart/donutChart";
import type { ApexOptions } from "apexcharts";
import { PageShell } from "src/components/PageShell";
import { AppConsts, colResponsive, ResponsiveBreakpoints, ResponsiveLayout, ResponsiveSpacing } from "src/lib/appconst";
import type { DatailDoHomeWorkDto } from "src/services/services_autogen";

const DoAssignment: React.FC = () => {
	const asignmentActions = useAssignmentActions();
	const listDetailAssignmentForAssignment = useDetailAssignmentForStudents();
	const chapterActions = useChapterActions();
	const listChapter = useChapters();
	const questionOptionActions = useQuestionOptionActions();
	const assignmentQuestionActions = useAssignmentQuestionActions();
	const studentAssignmentActions = useStudentAssignmentActions();

	const userId = Number(localStorage.getItem("userId"));
	const [selectedChapterId, setSelectedChapterId] = useState<number | undefined>
	(localStorage.getItem("selectedChapterId") ? Number(localStorage.getItem("selectedChapterId")) : undefined);
	const [datailDoHomeWorkDto, setDatailDoHomeWorkDto] = useState<DatailDoHomeWorkDto | null>(null);
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
		getSeriesDoHomeWorkRateDto();
	}, []);
	
	const getSeriesDoHomeWorkRateDto = async () => {
		const res = await studentAssignmentActions.getDetailDoHomeWorkDto(userId);
		setDatailDoHomeWorkDto(res);
	}

	const donutOptions: ApexOptions | undefined = useMemo(() => {
		if(datailDoHomeWorkDto == null ||datailDoHomeWorkDto.series == undefined){
			return
		}
		return {
			series: datailDoHomeWorkDto.series,
			labels: ['Đã xong','Chưa xong','Chưa bắt đầu'],
			chart: {
				type: 'donut',
				height: 350,
				fontFamily: 'Inter, sans-serif'
			},
			colors: [AppConsts.COLOR_PRIMARY,'#f59e0b','#ef4444'],
			tooltip: {
				enabled: false
			},
			plotOptions: {
				pie: {
					donut: {
						size: '70%',
						labels: {
							show: true,
							total: {
								show: true,
								label: 'Tổng số bài',
								fontSize: '14px',
								color: '#6b7280'
							}
						}
					}
				}
			},
			legend: { position: 'bottom' },
			responsive: [{
				breakpoint: ResponsiveBreakpoints.sm,
				options: {
					chart: { width: 200 },
					legend: { position: 'bottom' }
				}
			}]
		}
	}, [datailDoHomeWorkDto]);

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
	const choseAssignment = async (selectedDetailAssignmentId: number) =>{
		localStorage.setItem("selectedDetailAssignmentId", selectedDetailAssignmentId.toString())
		await questionOptionActions.getAllByQuestionId(selectedDetailAssignmentId);
		await assignmentQuestionActions.getAllAssignmentQuestionByAssignmentId(selectedDetailAssignmentId, userId);
		const studentAssignmentId = await studentAssignmentActions.getStudentAssignmentByStudentIDAndAssignmentId(userId,selectedDetailAssignmentId);
		localStorage.setItem("studentAssignmentId", (studentAssignmentId.id).toString());
		navigate("/detail-assignment");
	}
	return (
		<PageShell>
			<Row justify="space-between" gutter={[ResponsiveSpacing.rowGutter, ResponsiveSpacing.rowGutter]}>
				<Col xs={24} md={12} className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-bold text-gray-800">Làm bài tập</h2>
					</div>
				</Col>
				<Col xs={24} md={12}>
					<Space.Compact className="w-full max-w-md md:max-w-none">
						<Select
							allowClear
							value={selectedChapterId}
							onChange={(item) => onChangeChapterSelected(item)}
							options={optionSelectChapter}
							placeholder="Lọc theo chương..."
							className="min-w-0 flex-1"
							style={{ width: ResponsiveLayout.formControlWidth }}
						/>
						<Button type="primary" icon={<SearchOutlined />} onClick={fetchAssignmentForStudent} />
					</Space.Compact>
				</Col>
				<Col span={24} className="mt-6">
					<ListAssignmentGridView 
						listDetailAssignmentForAssignment={listDetailAssignmentForAssignment}
						choseAssignment={choseAssignment}
					/>
				</Col>
			</Row>
			<Row justify="center" style={{ marginTop: 40 }} gutter={[ResponsiveSpacing.rowGutter, ResponsiveSpacing.rowGutter]}>
				<Col {...colResponsive(24, 24, 24, 16, 16, 16)}>
					<Card title="Thống kê số dữ liệu học tập">
						<Row>
							<b><p style={{marginRight:"8px"}}>Điểm trung bình:</p> </b>{datailDoHomeWorkDto? datailDoHomeWorkDto.avgScore : 0}
						</Row>
						<Row>
							<b><p style={{marginRight:"8px"}}>Điểm tiến bộ:</p> </b>{datailDoHomeWorkDto? datailDoHomeWorkDto.avgScore : 0}
						</Row>
						<Row>
							<b><p style={{marginRight:"8px"}}>Phần kiến thức cần cải thiện thêm:</p> </b>{datailDoHomeWorkDto? datailDoHomeWorkDto.avgScore : 0}
						</Row>
					</Card>
				</Col>
				<Col {...colResponsive(24, 24, 24, 8, 8, 8)}>
					<Card title="Thống kê tỉ lệ làm bài tập">
						{donutOptions && (
							<DounutChart donutOptions={donutOptions} />
							)
						}
					</Card>
				</Col>
			</Row>
		</PageShell>
	);
};

export default DoAssignment;