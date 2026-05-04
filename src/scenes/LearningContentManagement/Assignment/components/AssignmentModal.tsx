import { Card, Col, DatePicker, Modal, Row, Select } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { ModeTabClassesEnum } from "src/lib/enumconst";
import ClassTable from "src/scenes/StructureManagement/ClassManagement/components/ClassTable";
import type { AssignmentDto, ClassDto } from "src/services/services_autogen";
import { colResponsive, ResponsiveLayout, ResponsiveSpacing } from "src/lib/appconst";

export interface ClassAssignmentItem {
	assignmentId: number;
	listClasses: ClassDto[];
	publicTime: Dayjs | null;
}
interface IAssignmentModalProps {
	open: boolean;
	onCancel: () => void;
	onOk: (item: ClassAssignmentItem) => void;
	listClasses: ClassDto [];
	listAssignment: AssignmentDto [];
}
const AssigmentModal: React.FC<IAssignmentModalProps> = ({open, onCancel, onOk, listClasses, listAssignment}) => {
	const [selectedClasses, setSelectedClasses] = useState<ClassDto[]>([]);
	const [idSelectedAssignment, setIdSelectedAssignment] = useState<number>(-1);
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

	const lístAssignmentOptions = useMemo(() => {
		return listAssignment.map(item => ({
			label: item.title || "",
			value: item.id,
		}));
	}, [listAssignment]);
	
	const onClickRowClass = (record: ClassDto) => {
		if(selectedClasses.some(item => item.id === record.id)){
			return;
		}
		setSelectedClasses([...selectedClasses, record]);
	};

	const onRemoveSelectedClass = (record: ClassDto) => {
		setSelectedClasses(selectedClasses.filter(item => item.id !== record.id));
	}

	const optionOnSelect = (value: number) => {
		setIdSelectedAssignment(value);
	}
	const handleOk = () => {
		let item: ClassAssignmentItem = {
			assignmentId: idSelectedAssignment,
			listClasses: selectedClasses,
			publicTime: selectedDate,
		}
		onOk(item);
		
	}
	const onChangeDatePicker = async (date: Dayjs | null) => {
		setSelectedDate(date);
	}
	const onChangeSelectedAssignment = async (value: number) => {
		setIdSelectedAssignment(value);
	}
	return(
		<Modal
			open={open}
			onCancel={onCancel}
			onOk={handleOk}
			width={ResponsiveLayout.modalWidthFluid}
			closable={false}
		>
			<Row gutter={ResponsiveSpacing.rowGutter}>
				<Col {...colResponsive(24, 24, 24, 12, 12, 12)}>
					<Card title="Danh sách lớp học">
						<ClassTable 
							dataSource={listClasses}
							loading={false}
							onEdit={()=>{}}
							onDelete={()=>{}}
							totalClass={listClasses.length}
							mode={ModeTabClassesEnum.ASSIGNMENT}
							onClickRowClass={onClickRowClass}
						/>
					</Card>
				</Col>
				<Col {...colResponsive(24, 24, 24, 12, 12, 12)}>
					<Card title="Danh sách lớp học đã chọn">
						<Row gutter={ResponsiveSpacing.rowGutter} justify="end">
							<Col>
								<Select 
									style={{ width: ResponsiveLayout.formControlWidthMd }} 
									title="Chọn bài tập để giao"
									placeholder="Chọn bài tập để giao"
									options={lístAssignmentOptions}
									onSelect={(value)=>{optionOnSelect}}
									onChange={onChangeSelectedAssignment}
								/>
							</Col>
							<Col>
								<DatePicker value={selectedDate} showTime onChange={onChangeDatePicker} />
							</Col>
						</Row>
						&nbsp;&nbsp;&nbsp;
						<Row>
							<Col span={24}>
								<ClassTable 
									dataSource={selectedClasses}
									loading={false}
									onEdit={()=>{}}
									onDelete={()=>{}}
									totalClass={selectedClasses.length}
									mode={ModeTabClassesEnum.ASSIGNMENT_SELECTED}
									onRemoveSelectedClass={onRemoveSelectedClass}
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