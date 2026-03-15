import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { stores } from "../../stores/store";
import LoginModel from "../../services/tokenAuth/loginModel";

export default class FormLogin extends React.Component {
	onFinish = async (values: any) => {
		let input = new LoginModel(values.username, values.password, values.remember);
		try{

			await stores.authenticationStore.login(input);
			await stores.sessionStore.getCurrentLoginInformationsFromService();
			window.location.href = "/";
		}
		catch (error) {
			message.error("Sai tài khoản hoặc mật khẩu!");
		}
	}
	render = () => {
		return (
			<Form name="login" onFinish={this.onFinish} layout="vertical" >
				<Form.Item name="username" rules={[{ required: true, message: "Please enter username!" }]} >
					<Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: "Please enter password!" }]} >
					<Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" size="large" block >
						Đăng Nhập
					</Button>
				</Form.Item>
			</Form>
		);
	}
}