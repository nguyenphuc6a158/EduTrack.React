import { Modal } from "antd";
interface IAssignmentModalProps {
	open: boolean;
	onCancel: () => void;
	onOk: () => void;
}
const AssigmentModal: React.FC<IAssignmentModalProps> = ({open, onCancel, onOk}) => {
	return(
		<Modal
			title={"Giao bài tập"}
			open={open}
			onCancel={onCancel}
			onOk={onOk}
			width={"90%"}
			closable={false}
		>
		</Modal>
	)
}
export default AssigmentModal;