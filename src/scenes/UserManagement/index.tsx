import { Card, Col, Row } from "antd";
import React from "react";
import UserTable from "./table/userTable";
import { stores } from "../../stores/store";
import { UserDto } from "../../services/services_autogen";

export default class UserManagement extends React.Component {
	state = {
		isLoading: true,
	};
	listUser: UserDto[] = [];
	componentDidMount = async () => {	
		this.setState({isLoading: true});
		await this.getAll();
		this.setState({isLoading: false});
	}
	getAll = async() => {
		this.listUser = await stores.userStore.getAllUserFromService(undefined, undefined, undefined, undefined, undefined);
		console.log(this.listUser);
	}
	render(){
		return (
			<Card>
				<Row>
					<Col span={24}>
						<h2>User Management</h2>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<UserTable 
							listUser={this.listUser}
						/>
					</Col>
				</Row>
			</Card>
		)
	}
}