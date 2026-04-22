import { Button, Card, Col, Divider, Radio, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import ViewFilePDF from "src/components/ViewFilePDF";
import { CreateStudentAssignmentDto } from "src/services/services_autogen";
import { useAssignmentQuestionActions, useTotalCountAssignmentQuestion } from "src/stores/assignmentQuestionStore";
import { useQuestionOption, useQuestionOptionActions, useQuestionOptions } from "src/stores/questionOptionStore";
import { useQuestion, useQuestionActions, useSelectedAssimentId } from "src/stores/questionStore";
import { useStudentAssignmentActions } from "src/stores/studentAssignmentStore";
const DetailAssignment: React.FC = () => {
    const questionActions = useQuestionActions();
	const selectedAssignmentId = useSelectedAssimentId();
	const itemQuetion = useQuestion();
	const questionOptionActions = useQuestionOptionActions();
	const listQuestionOptions = useQuestionOptions();
	const itemQuestionOption = useQuestionOption();
	const totalCountAssignmentQuestion = useTotalCountAssignmentQuestion();

	const [orderIndex, setOrderIndex] = useState<number>(0);
	const [value, setValue] = useState<string>();

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
            await questionActions.getQuestionByAssignmentIdAndOrderIndex(
                selectedAssignmentId,
                orderIndex
            );
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
	const radioOptions = useMemo(() => {
		return listQuestionOptions.map(item=>{
			return{
				label: item.content || "", 
				value: item.id
			}
		})
	},[listQuestionOptions])
	const checkAnswers = async () => {
		await questionOptionActions.get(Number(value))
		
	}
	const renderCheckAnswer = () => {
		if (!itemQuestionOption || !itemQuetion) return null;
		if (itemQuestionOption.questionId !== itemQuetion.id) return null;
		return (
			<>
				{itemQuetion?.fileUrlExplain && (ViewFilePDF(import.meta.env.VITE_APP_BASE_API + itemQuetion.fileUrlExplain))}
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
					{itemQuetion && ViewFilePDF(import.meta.env.VITE_APP_BASE_API + itemQuetion.fileUrlAssignment || null)}
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
					<Button type="primary" onClick={checkAnswers}>Xác nhận câu trả lời</Button>
				</Col>
				<Col>
					<Button onClick={goToNextQuestion} disabled={orderIndex == totalCountAssignmentQuestion}>Câu tiếp</Button>
				</Col>
			</Row>
        </Card>
    );
};
export default DetailAssignment;
