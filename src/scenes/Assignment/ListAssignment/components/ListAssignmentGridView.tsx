import { ClockCircleOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import type React from "react";
import { CreateStudentAssignmentDto, type DetailAssignmentForStudentDto } from "src/services/services_autogen";
import { useAssignmentQuestionActions, useTotalCountAssignmentQuestion } from "src/stores/assignmentQuestionStore";
import { useStudentAssignmentActions } from "src/stores/studentAssignmentStore";
interface IListAssignmentGridViewProps {
	listDetailAssignmentForAssignment: DetailAssignmentForStudentDto[];
	choseAssignment: (id: number) => void;
}
const ListAssignmentGridView: React.FC<IListAssignmentGridViewProps> = ({listDetailAssignmentForAssignment, choseAssignment}) => {
	
	const studentAsignmentActions = useStudentAssignmentActions();
	const assignmentQuestionActions = useAssignmentQuestionActions();
	const totalCountAssignmentQuestion = useTotalCountAssignmentQuestion();

	let isDone: boolean = false;
	const formatDisplayTime = (value?: string | Date | null) => {
		if (!value) {
			return "Chưa có thời gian";
		}
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) {
			return "Chưa có thời gian";
		}
		return date.toLocaleString("vi-VN");
	};

	const createStudentAsignment = async (detailAssignment: DetailAssignmentForStudentDto, totalQuestions: number) => {
		let item: CreateStudentAssignmentDto = new CreateStudentAssignmentDto();
		item.assignmentId = detailAssignment.id;
		item.studentId = Number(localStorage.getItem("userId"));
		item.submittedAt = new Date();
		item.totalQuestions = totalQuestions;
		item.status = 1;
		item.score = 0;
		await studentAsignmentActions.create(item);
	}
	const fetchAsigmentQuestion = async (detailAssignment: DetailAssignmentForStudentDto) => {
		const totalQuestions = await assignmentQuestionActions.getAllAssignmentQuestionByAssignmentId(detailAssignment.id, Number(localStorage.getItem("userId")));
		return totalQuestions;
	}
	const onClickDoHomeWork = async (detailAssignment: DetailAssignmentForStudentDto) => {
		const totalQuestions = await fetchAsigmentQuestion(detailAssignment);
		if(detailAssignment.active == 0){
			await createStudentAsignment(detailAssignment, totalQuestions);
		}
		choseAssignment(detailAssignment.id);
	}
	return(
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{listDetailAssignmentForAssignment.map((detailAssignment) => {
				isDone = detailAssignment.active !== -1;
				const publicTime = (detailAssignment as DetailAssignmentForStudentDto & { publicTime?: string | Date }).publicTime;
				const displayTime = formatDisplayTime(publicTime);

				return (
				<Card
					key={detailAssignment.id}
					size="small"
					title={
						<Row align="middle" justify="space-between">
							<Col>Tiêu đề: {detailAssignment.title || ""}</Col>
							<Col>
								{isDone? 
									<svg 
										xmlns="http://www.w3.org/2000/svg" 
										width="30" 
										height="30" 
										viewBox="0 0 24 24" 
										fill="none" 
										stroke="currentColor" 
										strokeWidth="2" 
										strokeLinecap="round" 
										strokeLinejoin="round"
										className="text-green-600 dark:text-green-400"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg> : 
									<svg 
										xmlns="http://www.w3.org/2000/svg" 
										width="30" 
										height="30" 
										viewBox="0 0 24 24" 
										fill="none" 
										stroke="currentColor" 
										strokeWidth="2" 
										strokeLinecap="round" 
										strokeLinejoin="round"
										className="text-red-600 dark:text-red-400"
									>
										<path d="M18 6 6 18"/>
										<path d="m6 6 12 12"/>
									</svg>
								}
							</Col>
						</Row>
					}
					className="h-full rounded-2xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
					style={{
						backgroundColor: isDone ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
						borderColor: isDone ? 'var(--color-success-border)' : 'var(--color-error-border)',
						borderWidth: '2px',
						borderStyle: 'solid'
					}}
				>
					<Row>
						<Col className="flex flex-col h-full">
							<Row>
								<ReadOutlined style={{marginRight:"10px"}} />Chương: {detailAssignment.chapterName}
							</Row>
							<Row className="text-sm mb-2">
								<UserOutlined style={{marginRight:"10px"}}/> Người tạo: {detailAssignment.createBy}
							</Row>
							<Row className="text-sm mb-2">
								<ClockCircleOutlined style={{marginRight:"10px"}}/> Thời gian giao: {displayTime}
							</Row>
						</Col>
					</Row>
					<div className="flex gap-3">
						<Button
							className="flex-1"
							color={isDone ? "green" : "danger"}
							variant="solid"
						>
							{isDone ? "Hoàn thành" : "Chưa hoàn thành"}
						</Button>

						<Button
							className="flex-1"
							color="primary"
							variant="solid"
							onClick={() => onClickDoHomeWork(detailAssignment)}
						>
							Làm bài
						</Button>
					</div>
				</Card>
				);
			})}
		</div>
	)
}
export default ListAssignmentGridView;