import { Card, Col, Modal, Row, Select } from "antd";
import { ModeTabClassesEnum } from "src/lib/enum";
import ClassTable from "src/scenes/StructureManagement/ClassManagement/components/ClassTable";
import type { ClassDto } from "src/services/services_autogen";
interface IAssignmentModalProps {
	open: boolean;
	onCancel: () => void;
	onOk: () => void;
	listClasses: ClassDto [];
}
const AssigmentModal: React.FC<IAssignmentModalProps> = ({open, onCancel, onOk, listClasses}) => {
	return(
		<Modal
			open={open}
			onCancel={onCancel}
			onOk={onOk}
			width={"90%"}
			closable={false}
		>
			<Row gutter={16}>
				<Col span={12}>
					<Card title="Danh sách lớp học">
						<ClassTable 
							dataSource={listClasses}
							loading={false}
							onEdit={()=>{}}
							onDelete={()=>{}}
							totalClass={listClasses.length}
							mode={ModeTabClassesEnum.ASSIGNMENT}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Danh sách lớp học đã chọn">
						<Row gutter={16} justify="end">
							<Col>
								<Select 
									style={{width: "240px"}} 
									title="Chọn bài tập để giao"
									placeholder="Chọn bài tập để giao"
									options={[]}
								/>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<ClassTable 
									dataSource={listClasses}
									loading={false}
									onEdit={()=>{}}
									onDelete={()=>{}}
									totalClass={listClasses.length}
									mode={ModeTabClassesEnum.ASSIGNMENT_SELECTED}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</Modal>
	)
}
export default AssigmentModal;