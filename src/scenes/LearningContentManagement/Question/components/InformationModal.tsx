import { Card, Divider, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { extractDocxWithImages } from "src/lib/convertToHtml";
import type { QuestionDto } from "src/services/services_autogen";

interface IInformationModalProps {
	open: boolean;
	selectedQuestion: QuestionDto | null;
	onCancel: () => void;
}

const InformationModal: React.FC<IInformationModalProps> = ({ open, selectedQuestion, onCancel }) => {
	const [htmlContent, setHtmlContent] = useState("");
	const [htmlExplanation, setHtmlExplanation] = useState("");
	useEffect(() => {
		const load = async () => {
			if (!selectedQuestion) return;
			const htmlContent = await extractDocxWithImages(selectedQuestion?.fileUrl || "");
			setHtmlContent(htmlContent);
			setHtmlExplanation(htmlExplanation);
		};
		load();
	}, [selectedQuestion]);
	return (
		<Modal
			title="Thông tin chi tiết câu hỏi"
			open={open}
			onCancel={onCancel}
			width={"70%"}
			footer={null}
		>
			{selectedQuestion && (
				<div style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 8 }}>
					<Card style={{ marginBottom: 16 }}>
						<h5><b>Nội dung câu hỏi:</b></h5>
						<Divider style={{ margin: "8px 0" }} />
						<div
							style={{ lineHeight: 1.6 }}
							dangerouslySetInnerHTML={{ __html: htmlContent }}
						/>
					</Card>
				</div>
			)}
		</Modal>
	)
};
export default InformationModal;