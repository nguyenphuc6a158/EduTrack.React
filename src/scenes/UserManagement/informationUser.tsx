import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import React from "react";

export default class InformationUser extends React.Component{
	render () {
		return (
			<Card>
				<Col span={5}>
					<Row justify='center'>
						<Avatar size={200} icon={<UserOutlined />}></Avatar>
					</Row>
				</Col>
				<Col span={19}>
					<Row>
						
					</Row>
				</Col>
			</Card>
		)	
	}
}