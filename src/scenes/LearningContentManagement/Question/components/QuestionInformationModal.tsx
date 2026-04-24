import { Modal} from "antd";
import ViewFilePDF from "src/components/ViewFilePDF";
import { ModeViewFilePDF } from "src/lib/enum";
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
			{selectedQuestion && 
				<ViewFilePDF 
					fileUrl={import.meta.env.VITE_APP_BASE_API + selectedQuestion.fileUrlAssignment ||null}
					mode={ModeViewFilePDF.ASSIGNMENTQUESTIONVIEW}
				/>}
			{selectedQuestion && 
				<ViewFilePDF 
					fileUrl={import.meta.env.VITE_APP_BASE_API + selectedQuestion.fileUrlExplain ||null}
					mode={ModeViewFilePDF.ASSIGNMENTQUESTIONVIEW}
				/>}
		</Modal>
	)
};
export default QuestionInformationModal;