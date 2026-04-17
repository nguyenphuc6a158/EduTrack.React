import Icon, { CheckOutlined, CloseOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import type React from "react";
import type { DetailAssignmentForStudentDto } from "src/services/services_autogen";
interface IListAssignmentGridViewProps {
	listDetailAssignmentForAssignment: DetailAssignmentForStudentDto[];
	choseAssignment: (id: number) => void;
}
const ListAssignmentGridView: React.FC<IListAssignmentGridViewProps> = ({listDetailAssignmentForAssignment, choseAssignment}) => {
	return(
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{listDetailAssignmentForAssignment.map((detailAssignment) => {
				const isDone = detailAssignment.active !== -1;

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
										stroke="#009d17" 
										strokeWidth="2" 
										strokeLinecap="round" 
										strokeLinejoin="round"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg> : 
									<svg 
										xmlns="http://www.w3.org/2000/svg" 
										width="30" 
										height="30" 
										viewBox="0 0 24 24" 
										fill="none" 
										stroke="#ff0000" 
										strokeWidth="2" 
										strokeLinecap="round" 
										strokeLinejoin="round"
									>
										<path d="M18 6 6 18"/>
										<path d="m6 6 12 12"/>
									</svg>
								}
							</Col>
						</Row>
					}
					className={`
					h-full rounded-2xl shadow-md transition-all duration-200
					${isDone 
						? "bg-green-100! border! border-green-400!" 
						: "bg-red-100! border! border-red-400!"}
					hover:scale-105 hover:shadow-lg
					`}
					style={{backgroundColor: "transparent"}}
				>
					<Row>
						<Col className="flex flex-col h-full">
							<Row>
								<ReadOutlined style={{marginRight:"10px"}} />Chương: {detailAssignment.chapterName}
							</Row>
							<Row className="text-sm mb-2">
								<UserOutlined style={{marginRight:"10px"}}/> Người tạo: {detailAssignment.createBy}
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
							onClick={()=>choseAssignment(detailAssignment.id)}
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