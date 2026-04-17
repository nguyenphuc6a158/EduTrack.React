import { Button, Card, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { extractDocxWithImages, extractRawTextFromFile, parseContentQuestion } from "src/lib/convertToHtml";
import { useQuestion, useQuestionActions, useSelectedAssimentId } from "src/stores/questionStore";
const DetailAssignment: React.FC = () => {
    const questionActions = useQuestionActions();
	const selectedDetailAssignment = useSelectedAssimentId();
	const itemQuetion = useQuestion();
	const [orderIndex, setOrderIndex] = useState<number>(0);
	const [htmlContent, setHtmlContent] = useState<string>("");

	const getItemQuestion = async () => {
        if (orderIndex == 0 || selectedDetailAssignment == 0) {
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
        let curOrderIndex = orderIndex + 1;
        setOrderIndex(curOrderIndex);
    };

	const goToPreQuestion = () => {
		let curOrderIndex = orderIndex + 1;
        setOrderIndex(curOrderIndex);
	}
	const load = async () => {
		if (!itemQuetion) return;
		const htmlContent = await extractDocxWithImages(itemQuetion?.fileUrl || "");
		setHtmlContent(htmlContent);
	};
	useEffect(() => {
		load();
	}, [itemQuetion]);

    return (
        <Card>
			<Row>
				<Col span={24}>
					{itemQuetion && (
					<div className="w-full" style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 8 }}>
						<Card className="w-full mb-4">
						<h5><b>Nội dung câu hỏi:</b></h5>
						<Divider style={{ margin: "8px 0" }} />
						<div
							style={{ lineHeight: 1.6 }}
							dangerouslySetInnerHTML={{ __html: htmlContent }}
						/>
						</Card>
					</div>
					)}
				</Col>
			</Row>
			<Row justify={"center"}>
				<Col>
					<Button onClick={goToPreQuestion}>Câu trước</Button>
				</Col>
				<Col>
					<Button onClick={goToNextQuestion}>Câu tiếp</Button>
				</Col>
			</Row>
        </Card>
    );
};
export default DetailAssignment;
