import { Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { colResponsive } from "../../lib/appconst";
import FormLogin from "./formLogin";

export default class Login extends React.Component {
	render() {
		return (
			<Row
				justify="center"
				align="middle"
				style={{
				height: "100vh",
				backgroundImage:
					"url('/25549.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				}}
			>
				<Col {...colResponsive(22, 16, 12, 8, 6, 6)}>
					<Card style={{
						borderRadius: 16,
						background: "rgba(255,255,255,0.2)",
						backdropFilter: "blur(12px)",
						WebkitBackdropFilter: "blur(12px)",
						boxShadow: "0 8px 32px rgba(0,0,0,0.3)",}}
					>
						<Title level={3} style={{ textAlign: "center", color: "#fff" }}>
							Đăng Nhập
						</Title>
						&nbsp;
						<FormLogin />
					</Card>
				</Col>
			</Row>
		);
	}
}