import { Button, Card, Col, Divider, Modal, Radio, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewFilePDF from "src/components/ViewFilePDF";
import { DetailAssignmentActive, ModeViewFilePDF } from "src/lib/enumconst";
import { CreateStudentAnswerInput, QuestionOptionDto, StudentAssignmentDto, UpdateStudentAnswerInput, UpdateStudentAssignmentInput } from "src/services/services_autogen";
import { useAssignmentQuestionActions, useTotalCountAssignmentQuestion } from "src/stores/assignmentQuestionStore";
import { useQuestionOption, useQuestionOptionActions, useQuestionOptions } from "src/stores/questionOptionStore";
import { useQuestion, useQuestionActions, useQuestions, useQuestionsByAssignment, useTotalCountQuestion } from "src/stores/questionStore";
import { useStudentAnswerActions } from "src/stores/studentAnswerStore";
import { useStudentAssignmentActions } from "src/stores/studentAssignmentStore";
const DetailAssignment: React.FC = () => {
	const questionOptionActions = useQuestionOptionActions();
	const listQuestionOptions = useQuestionOptions();
	const itemQuestionOption = useQuestionOption();
	const studentAnswerActions = useStudentAnswerActions();
	const studentAsignmentActions = useStudentAssignmentActions();
	const totalCountQuestion = useTotalCountQuestion();
	const listQuestionByAssignment = useQuestionsByAssignment();
	const questionActions = useQuestionActions();
	const navigate = useNavigate();

	const [value, setValue] = useState<number>();
	const [isCheckingAnswer, setIsCheckingAnswer] = useState<boolean>(false);
	const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
	const [listCheckedAnswers, setlistCheckedAnswers] = useState<Record<number, number>>({});
	const [index, setIndex] = useState<number>(0);
	const [totalCorrect, setTotalCorrect] = useState<number>(0);

	const studentId = Number(localStorage.getItem("userId"));
	const selectedAssignmentId = Number(localStorage.getItem("selectedDetailAssignmentId"));
	const studentAssignmentId = Number(localStorage.getItem("studentAssignmentId"));
	const fetchQuestionOption = async () => {
		if(listQuestionByAssignment[index] != undefined){
			await questionOptionActions.getAllByQuestionId(listQuestionByAssignment[index].id);
		}
	};

	const goToNextQuestion = () => {
        setIndex(index + 1);
    };

	const goToPreQuestion = () => {
        setIndex(Math.max(0, index - 1));
	};
	const fetchQuestions = async () => {
		await questionActions.getAllQuestionByAssignment(selectedAssignmentId);
	}

	useEffect(() => {
		fetchQuestionOption();
	}, [index, listQuestionByAssignment]);
	
	useEffect(() => {
		fetchQuestions();
	}, []);

	useEffect(() => {
		if (selectedAssignmentId > 0) {
			setIndex(0);
		}
	}, [selectedAssignmentId]);

	useEffect(() => {
		if (listQuestionByAssignment[index]?.id && listCheckedAnswers[listQuestionByAssignment[index].id]) {
			setValue(listCheckedAnswers[listQuestionByAssignment[index].id]);
			setIsAnswerChecked(true);
		} else {
			setIsAnswerChecked(false);
			setValue(undefined);
		}
	}, [index, listQuestionByAssignment[index]?.id, listCheckedAnswers]);

	const radioOptions = useMemo(() => {
		return listQuestionOptions.map(item=>{
			return{
				label: item.content || "", 
				value: item.id,
			}
		})
	},[listQuestionOptions]);
	const updateStudentAssignment = async(curTotalCorrect: number) => {
		let item: UpdateStudentAssignmentInput = new UpdateStudentAssignmentInput();
		item.assignmentId = selectedAssignmentId;
		item.studentId = studentId;
		item.submittedAt = new Date();
		item.status = DetailAssignmentActive.INPROGRESS;
		if(index == totalCountQuestion - 1){
			item.status = DetailAssignmentActive.COMPLATED;
		}
		item.score = (curTotalCorrect/totalCountQuestion)*10;
		item.totalCorrect = curTotalCorrect;
		item.totalQuestions = totalCountQuestion;
		await studentAsignmentActions.update(item);
	}
	const saveStudentAnswer = async (optionQuestion: QuestionOptionDto) => {
		let itemCreate: CreateStudentAnswerInput = new CreateStudentAnswerInput();
		itemCreate.isCorrect = optionQuestion.isCorrect;
		itemCreate.questionId = listQuestionByAssignment[index].id;
		itemCreate.selectedOptionId = optionQuestion.id;
		itemCreate.studentAssignmentId = studentAssignmentId;
		await studentAnswerActions.create(itemCreate);
	}
	const checkAnswers = async () => {
		if (!value || !listQuestionByAssignment[index]?.id) return;

		try {
			setIsCheckingAnswer(true);
			const optionQuestion = await questionOptionActions.get(Number(value));
			if (!optionQuestion) return;
			const isCorrect = optionQuestion.isCorrect === true;
			const newTotal = isCorrect ? totalCorrect + 1 : totalCorrect;
			setTotalCorrect(newTotal);
			await updateStudentAssignment(newTotal);
			await saveStudentAnswer(optionQuestion);
			setlistCheckedAnswers(prev => ({
				...prev,
				[listQuestionByAssignment[index].id]: Number(value),
			}));

		} catch (error) {
			console.error(error);
		} finally {
			setIsCheckingAnswer(false);
			setIsAnswerChecked(true);
		}
	};

	const renderCheckAnswer = () => {
		if (!itemQuestionOption || !listQuestionByAssignment[index]) return null;
		if (itemQuestionOption.questionId !== listQuestionByAssignment[index].id) return null;
		return (
			<>
				{listQuestionByAssignment[index]?.fileUrlExplain && 
					<ViewFilePDF 
						fileUrl={import.meta.env.VITE_APP_BASE_API + listQuestionByAssignment[index].fileUrlExplain}  
						mode={ModeViewFilePDF.ASSIGNMENTQUESTIONVIEW}
					/>}
				{itemQuestionOption.isCorrect ? (
					<div style={{ display: "flex" }}>
					<h2 style={{ marginRight: "10px" }}>Đúng</h2>
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
					</svg>
					</div>
				) : (
					<div style={{ display: "flex" }}>
					<h2 style={{ marginRight: "10px" }}>Sai</h2>
					<svg width="30" height="30" viewBox="0 0 24 24" stroke="#ff0000">
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
					</div>
				)}
			</>	
		)
	}
    return (
        <Card>
			<Row>
				<Col span={24}>
					{listQuestionByAssignment[index] && 
						<ViewFilePDF 
							fileUrl={import.meta.env.VITE_APP_BASE_API + listQuestionByAssignment[index].fileUrlAssignment || null}
							mode={ModeViewFilePDF.ASSIGNMENTQUESTIONVIEW}
						/>}
				</Col>
			</Row>
			<Row>
				<Col span={24}>
				{renderCheckAnswer()}
					{listQuestionOptions.length > 0 && (
						<div className="mt-4">
							<Divider />
							<Radio.Group
								options={radioOptions}
								value={value}
								onChange={(e) => setValue(e.target.value)}
								style={{ display: "flex", flexDirection: "column" }}
								disabled={isAnswerChecked}
							/>
						</div>
					)}
				</Col>
			</Row>
			<Row style={{marginTop:"20px"}} justify={"center"} gutter={200}>
				<Col>
					<Button onClick={goToPreQuestion} disabled={index == 0}>Câu trước</Button>
				</Col>
				<Col>
					<Button 
						type="primary" 
						onClick={checkAnswers} 
						loading={isCheckingAnswer} 
						disabled={!value || isAnswerChecked}
					>
						{index == totalCountQuestion - 1 ? "Xong" : "Xác nhận câu trả lời"}
					</Button>
					&nbsp;&nbsp;
					{(index == totalCountQuestion - 1) && 
						<Button 
							type="primary" 
							onClick={()=>navigate("/home-work/do-assignment")} 
							loading={isCheckingAnswer} 
						>
							Hoàn thành
						</Button>
					}
				</Col>
				<Col>
					<Button onClick={goToNextQuestion} disabled={index == totalCountQuestion - 1}>Câu tiếp</Button>
				</Col>
			</Row>
        </Card>
    );
};
export default DetailAssignment;
