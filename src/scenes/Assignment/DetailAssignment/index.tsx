import { Button, Card, Col, Divider, Radio, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { extractDocxWithImages, extractRawTextFromUrlFile } from "src/lib/convertToHtml";
import { useQuestionOption, useQuestionOptionActions, useQuestionOptions } from "src/stores/questionOptionStore";
import { useQuestion, useQuestionActions, useSelectedAssimentId } from "src/stores/questionStore";
const DetailAssignment: React.FC = () => {
    const questionActions = useQuestionActions();
	const selectedDetailAssignment = useSelectedAssimentId();
	const itemQuetion = useQuestion();
	const questionOptionActions = useQuestionOptionActions();
	const listQuestionOptions = useQuestionOptions();
	const itemQuestionOption = useQuestionOption();
	const [orderIndex, setOrderIndex] = useState<number>(0);
	const [answer, setAnswer] = useState<string>("");
	const [value, setValue] = useState<string>();
	const fetchQuestionOption = async () => {
		if (!itemQuetion?.id) {
			return;
		}
		await questionOptionActions.getAllByQuestionId(itemQuetion.id);
	};
	const getItemQuestion = async () => {
        if (orderIndex === 0 || selectedDetailAssignment === 0) {
            return;
        }
        try {
            await questionActions.getQuestionByAssignmentIdAndOrderIndex(
                selectedDetailAssignment,
                orderIndex
            );
        } catch (error) {
            console.log(error);
            setOrderIndex(0);
        }
    };
    useEffect(() => {
        getItemQuestion();
    }, [orderIndex, selectedDetailAssignment]);

	const goToNextQuestion = () => {
        setOrderIndex(orderIndex + 1);
    };

	const goToPreQuestion = () => {
        setOrderIndex(Math.max(1, orderIndex - 1));
	};
	const load = async () => {
		if (!itemQuetion) return;
		let text = await extractRawTextFromUrlFile(itemQuetion.fileUrl||"")
		setAnswer(text.split("Đáp án:")[0].trim());
		await extractDocxWithImages(itemQuetion?.fileUrl || "");
	};
	useEffect(() => {
		if (!itemQuetion?.id) {
			return;
		}
		load();
		fetchQuestionOption();
	}, [itemQuetion?.id]);

	useEffect(() => {
		if (selectedDetailAssignment > 0) {
			setOrderIndex(1);
		}
	}, [selectedDetailAssignment]);
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
		return (itemQuestionOption.isCorrect ?
		<div style={{display: "flex"}}>
			<h2 style={{marginRight:"10px"}}>Đúng</h2> 
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
		:
		<div style={{display: "flex"}}>
			<h2 style={{marginRight:"10px"}}>Sai</h2> 
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
		</div>
		)
	}
    return (
        <Card>
			<Row>
				<Col span={24}>
					{itemQuetion && (
					<div className="w-full" style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 8 }}>
						{answer}
					</div>
					)}
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
					{renderCheckAnswer()}
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
					<Button onClick={goToNextQuestion}>Câu tiếp</Button>
				</Col>
			</Row>
        </Card>
    );
};
export default DetailAssignment;
