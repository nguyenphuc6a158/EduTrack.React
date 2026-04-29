import { ClockCircleOutlined, FireOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import type { ButtonProps } from "antd/lib/button";
import type React from "react";
import { DetailAssignmentActive } from "src/lib/enumconst";
import { type DetailAssignmentForStudentDto } from "src/services/services_autogen";
import { SlEmotsmile } from "react-icons/sl";
import { FaRegSadCry } from "react-icons/fa";
interface IListAssignmentGridViewProps {
	listDetailAssignmentForAssignment: DetailAssignmentForStudentDto[];
	choseAssignment: (id: number) => void;
}
const ListAssignmentGridView: React.FC<IListAssignmentGridViewProps> = ({listDetailAssignmentForAssignment, choseAssignment}) => {
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
	const onClickDoHomeWork = async (detailAssignment: DetailAssignmentForStudentDto) => {
		choseAssignment(detailAssignment.id);
	}
	const renderIconStatus = (detailAssignment: DetailAssignmentForStudentDto) => {
		if(detailAssignment.active == DetailAssignmentActive.COMPLATED){
			return (
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
				</svg>
			)
		} else if(detailAssignment.active == DetailAssignmentActive.NOTSTARTED){
			return(
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
			)
		} else{
			return (
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
					className="text-yellow-600 dark:text-yellow-400"
				>
					<path d="M18 6 6 18"/>
					<path d="m6 6 12 12"/>
				</svg>
			)
		}
	}
	const renderButton = (detailAssignment: DetailAssignmentForStudentDto) => {
		let text = "Chưa Xong";
		let colorButton: ButtonProps["color"] = "yellow";
		if(detailAssignment.active == DetailAssignmentActive.COMPLATED){
			text = "Xong";
			colorButton = "primary";
		} else if(detailAssignment.active == DetailAssignmentActive.NOTSTARTED){
			text = "Chưa bắt đầu";
			colorButton = "red";
		}
		return (
			<Button
				className="flex-1"
				color={colorButton}
				variant="solid"
			>
				{text}
			</Button>
		)
	}
	const getCardStyle = (active: DetailAssignmentActive) => {
		switch (active) {
			case DetailAssignmentActive.COMPLATED:
				return {
					backgroundColor: 'var(--color-success-bg)',
					borderColor: 'var(--color-success-border)',
				};
			case DetailAssignmentActive.NOTSTARTED:
				return {
					backgroundColor: 'var(--color-error-bg)',
					borderColor: 'var(--color-error-border)',
				};
			default:
				return {
					backgroundColor: 'var(--color-warning-bg)',
					borderColor: 'var(--color-warning-border)',
				};
		}
	};
	const renderIconScore = (detailAssignment: DetailAssignmentForStudentDto) => {
		if(detailAssignment.score >= 8.5 && detailAssignment.score <= 10){
			return <FireOutlined style={{marginRight:"10px"}}/>
		}
		else if(detailAssignment.score < 8.5 && detailAssignment.score >= 7){
			return <SlEmotsmile style={{marginRight:"10px"}}/>
		}
		else if(detailAssignment.score < 7){
			return <FaRegSadCry style={{marginRight:"10px"}}/>
		}
	}
	return(
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{listDetailAssignmentForAssignment.map((detailAssignment) => {
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
								{renderIconStatus(detailAssignment)}
							</Col>
						</Row>
					}
					className="h-full rounded-2xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
					style={{
						...getCardStyle(detailAssignment.active),
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
							<Row className="text-sm mb-2">
								{renderIconScore(detailAssignment)} Điểm: {detailAssignment.score}
							</Row>
						</Col>
					</Row>
					<div className="flex gap-3">
						{renderButton(detailAssignment)}

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