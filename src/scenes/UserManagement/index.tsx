import { Button, Card, Col, Modal, Row } from "antd";
import React from "react";
import { stores } from "../../stores/store";
import { RoleDto, UserDto } from "../../services/services_autogen";
import FormCreateOrUpdate from "./formCreateOrUpdate";
import { PlusOutlined } from "@ant-design/icons";
import TableUser from "./table/tableUser";

export default class UserManagement extends React.Component {
	state = {
		isLoading: true,
		visibleFormCreateOrUpdateUser: false,
	};
	listUser: UserDto[] = [];
	listRole: RoleDto[] = [];
	componentDidMount = async () => {
		await this.getAll();
	}
	getAll = async() => {
		this.setState({isLoading: true});
		this.listUser = await stores.userStore.getAllUserFromService(undefined, undefined, undefined, undefined, undefined);
		this.listRole = await stores.roleStore.getAllRoleFromService(undefined, undefined, undefined, undefined, undefined);
		this.setState({isLoading: false});
	}
	openFormCreateOrUpdateUser = () => {
		this.setState({visibleFormCreateOrUpdateUser: true});
	}
	render(){
		return (
			<Card>
				<Row>
					<Col span={4}>
						<h2>Quản lý người dùng</h2>
					</Col>
					<Col span={20} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
						<Button type="primary" onClick={this.openFormCreateOrUpdateUser}>
							<PlusOutlined />Thêm người dùng
						</Button>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<TableUser
							listUser={this.listUser}
							getAllListUser={this.getAll}
							isLoading={this.state.isLoading}
						/>
					</Col>
				</Row>
				<Modal
					open={this.state.visibleFormCreateOrUpdateUser}
					onCancel={() => this.setState({visibleFormCreateOrUpdateUser: false})}
					footer={null}
				>
					<FormCreateOrUpdate 
						onCancel={() => this.setState({visibleFormCreateOrUpdateUser: false})}
						listRole={this.listRole}
						getAllListUser={this.getAll}
					/>
				</Modal>
			</Card>
		)
	}
}