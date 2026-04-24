import { Button, Card, Col, Divider, Radio, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import ViewFilePDF from "src/components/ViewFilePDF";
import { DetailAssignmentActive, ModeViewFilePDF } from "src/lib/enum";
import { CreateStudentAnswerDto, UpdateStudentAssignmentDto } from "src/services/services_autogen";
import { useAssignmentQuestionActions, useTotalCountAssignmentQuestion } from "src/stores/assignmentQuestionStore";
import { useQuestionOption, useQuestionOptionActions, useQuestionOptions } from "src/stores/questionOptionStore";
import { useQuestion, useQuestionActions, useSelectedAssimentId } from "src/stores/questionStore";
import { useStudentAnswerActions } from "src/stores/studentAnswerStore";
import { useStudentAssignmentActions } from "src/stores/studentAssignmentStore";
const DetailAssignment: React.FC = () => {
    const questionActions = useQuestionActions();
	const selectedAssignmentId = useSelectedAssimentId();
	const itemQuetion = useQuestion();
	const questionOptionActions = useQuestionOptionActions();
	const listQuestionOptions = useQuestionOptions();
	const itemQuestionOption = useQuestionOption();
	const totalCountAssignmentQuestion = useTotalCountAssignmentQuestion();
	const studentAnswerActions = useStudentAnswerActions();
	const studentAsignmentActions = useStudentAssignmentActions();
	const [orderIndex, setOrderIndex] = useState<number>(0);
	const [value, setValue] = useState<number>();
	const [isCheckingAnswer, setIsCheckingAnswer] = useState<boolean>(false);
	const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
	const [listCheckedAnswers, setlistCheckedAnswers] = useState<Record<number, number>>({});
	const studentId = Number(localStorage.getItem("userId"));
	const fetchQuestionOption = async () => {
		if (!itemQuetion?.id) {
			return;
		}
		await questionOptionActions.getAllByQuestionId(itemQuetion.id);
	};

	const getItemQuestion = async () => {
        if (orderIndex === 0 || selectedAssignmentId === 0) {
            return;
        }
        try {
            await questionActions.getQuestionByAssignmentIdAndOrderIndex(selectedAssignmentId, orderIndex);
        } catch (error) {
            console.log(error);
            setOrderIndex(0);
        }
    };

    useEffect(() => {
        getItemQuestion();
    }, [orderIndex, selectedAssignmentId]);

	const goToNextQuestion = () => {
        setOrderIndex(orderIndex + 1);
    };

	const goToPreQuestion = () => {
        setOrderIndex(Math.max(1, orderIndex - 1));
	};

	useEffect(() => {
		if (!itemQuetion?.id) {
			return;
		}
		fetchQuestionOption();
	}, [itemQuetion?.id]);

	useEffect(() => {
		if (selectedAssignmentId > 0) {
			setOrderIndex(1);
		}
	}, [selectedAssignmentId]);

	useEffect(() => {
		if (itemQuetion?.id && listCheckedAnswers[itemQuetion.id]) {
			questionOptionActions.get(listCheckedAnswers[itemQuetion.id]);
			setValue(listCheckedAnswers[itemQuetion.id]);
			setIsAnswerChecked(true);
		} else {
			setIsAnswerChecked(false);
			setValue(undefined);
		}
	}, [orderIndex, itemQuetion?.id, listCheckedAnswers]);

	const radioOptions = useMemo(() => {
		return listQuestionOptions.map(item=>{
			return{
				label: item.content || "", 
				value: item.id,
			}
		})
	},[listQuestionOptions]);
	const updateStudentAssignment = async() => {
		let item: UpdateStudentAssignmentDto = new UpdateStudentAssignmentDto();
		item.assignmentId = selectedAssignmentId;
		item.studentId = studentId;
		item.submittedAt = new Date();
		item.status = DetailAssignmentActive.INPROGRESS;
		item.score = 0;
		await studentAsignmentActions.create(item);
	}
	const createOrUpdateStudentAnswer = async () => {
		if (!itemQuestionOption || !itemQuetion){ 
			return
		};
		
		let item: CreateStudentAnswerDto = new CreateStudentAnswerDto();
		item.isCorrect = itemQuestionOption.isCorrect;
		item.questionId = itemQuetion.id;
		item.selectedOptionId = itemQuestionOption.id;
		item.studentAssignmentId = studentId;
		let existed = await studentAnswerActions.checkExist(item)
		if(existed){
			return
		}
		await studentAnswerActions.create(item);
	}
	const checkAnswers = async () => {
		if (!value || !itemQuetion?.id) return;
		try {
		
			setIsCheckingAnswer(true);
			await questionOptionActions.get(Number(value));
			setlistCheckedAnswers({ ...listCheckedAnswers, [itemQuetion.id]: Number(value) });
		} catch (error) {
			console.error(error);
		} finally {
			setIsCheckingAnswer(false);
			setIsAnswerChecked(true);
		}
	};

	const renderCheckAnswer = () => {
		if (!itemQuestionOption || !itemQuetion) return null;
		if (itemQuestionOption.questionId !== itemQuetion.id) return null;
		return (
			<>
				{itemQuetion?.fileUrlExplain && 
					<ViewFilePDF 
						fileUrl={import.meta.env.VITE_APP_BASE_API + itemQuetion.fileUrlExplain}  
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
					{itemQuetion && 
						<ViewFilePDF 
							fileUrl={import.meta.env.VITE_APP_BASE_API + itemQuetion.fileUrlAssignment || null}
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
					<Button onClick={goToPreQuestion} disabled={orderIndex==1}>Câu trước</Button>
				</Col>
				<Col>
					<Button type="primary" onClick={checkAnswers} loading={isCheckingAnswer} disabled={!value || isAnswerChecked}>Xác nhận câu trả lời</Button>
				</Col>
				<Col>
					<Button onClick={goToNextQuestion} disabled={orderIndex == totalCountAssignmentQuestion}>Câu tiếp</Button>
				</Col>
			</Row>
        </Card>
    );
};
export default DetailAssignment;
