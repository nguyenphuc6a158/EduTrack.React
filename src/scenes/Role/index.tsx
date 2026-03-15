import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row } from "antd";
import React from "react";
import TableRole from "./tableRole";
import { PermissionDto, RoleDto } from "../../services/services_autogen";
import { stores } from "../../stores/store";

export default class RoleManagement extends React.Component{
	state={
		isLoading: true,
		visibleModalRole: false,
	}
	componentDidMount = async() => {
		await this.getAll();
	}
	listRole: RoleDto [] = [];
	listPermission: PermissionDto [] = [];
	getAll = async () => {
		this.setState({isLoading: true});
		this.listRole = await stores.roleStore.getAllRoleFromService(undefined, undefined, undefined, undefined);
		this.listPermission = await stores.roleStore.getAllPermissions();
		console.log(this.listPermission)
		this.setState({isLoading: true});
	}
	openFormCreateOrUpdateUser = () => {
		this.setState({visibleModalRole: true});
	}
	render(){
		return(
			<Card>
				<Row>
					<Col span={4}>
						<h2>Quản lý vai trò</h2>
					</Col>
					<Col span={20} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
						<Button type="primary" onClick={this.openFormCreateOrUpdateUser}>
							<PlusOutlined />Thêm vai trò
						</Button>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<TableRole 
							listRole={this.listRole}
							openFormCreateOrUpdateUser={this.openFormCreateOrUpdateUser}
						/>
					</Col>
				</Row>
				<Modal
					open={this.state.visibleModalRole}
					footer={null}
					onCancel={() => this.setState({visibleModalRole: false})}
				>

				</Modal>
			</Card>
		)
	}
}