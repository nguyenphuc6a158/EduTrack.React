import { Card, Divider, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import ViewFilePDF from "src/components/ViewFilePDF";
import type { QuestionDto } from "src/services/services_autogen";

interface IQuestionInformationModalProps {
	open: boolean;
	selectedQuestion: QuestionDto | null;
	onCancel: () => void;
}

const QuestionInformationModal: React.FC<IQuestionInformationModalProps> = ({ open, selectedQuestion, onCancel }) => {
	return (
		<Modal
			title="Thông tin chi tiết câu hỏi"
			open={open}
			onCancel={onCancel}
			width={"70%"}
			footer={null}
		>
			{selectedQuestion && ViewFilePDF(selectedQuestion.fileUrlAssignment ||null)}
		</Modal>
	)
};
export default QuestionInformationModal;