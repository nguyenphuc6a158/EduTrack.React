import { Button, Card, Col, Row, Modal } from "antd";
import React from "react";
import TableClassManagement from "./table/tableClassManagement";
import { stores } from "../../../stores/store";
import { ClassDto } from "../../../services/services_autogen";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FormCreatOrUpdateClass from "./formCreatOrUpdateClass";

export default class ClassManagement extends React.Component {
	state = {
		isLoading: true,
		visibleFormCreateOrUpdate: false,
	};
	listClass: ClassDto[] = [];
	componentDidMount(): void {
		this.setState({isLoading: true});
		this.getAll();
		this.setState({isLoading: false});
	}
	getAll = async() => {
		this.listClass = await stores.classStore.getAllClassFromService(undefined, undefined, undefined);
	}
	openFormCreateOrUpdate = () => {
		this.setState({visibleFormCreateOrUpdate: true});
	}
	render() {
		return(
			<Card>
				<Row>
					<Col span={4}>
						<h2>Quản lý lớp học</h2>
					</Col>
					<Col style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }} span={20}>
						<Button type="primary" onClick={this.openFormCreateOrUpdate}>
							<PlusOutlined />Thêm lớp học
						</Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="dashed" >
							<DeleteOutlined />Xóa tất cả
						</Button>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<TableClassManagement
							listClass={this.listClass}
						/>
					</Col>
				</Row>
				<Modal
					open={this.state.visibleFormCreateOrUpdate}
					onCancel={() => this.setState({visibleFormCreateOrUpdate: false})}
					width="50%"
					footer={null}
				>
					<FormCreatOrUpdateClass
						onCancel={() => this.setState({visibleFormCreateOrUpdate: false})}
					/>
				</Modal>
			</Card>
		)
	}
}