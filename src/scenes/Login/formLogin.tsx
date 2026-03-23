import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import { stores } from "src/stores/store";
import { AuthenticateModel } from "src/services/services_autogen";

export default class FormLogin extends React.Component {
	onFinish = async (values: AuthenticateModel) => {
		let input = new AuthenticateModel();
		input.userNameOrEmailAddress = values.userNameOrEmailAddress;
		input.password = values.password;
		input.rememberClient = values.rememberClient;
		try {
			await stores.authenticationStore.login(input);
			window.location.href = "/";
		}
		catch (error) {
			message.error("Sai tài khoản hoặc mật khẩu!");
		}
	}
	render = () => {
		return (
			<Form name="login" onFinish={this.onFinish} layout="vertical" >
				<Form.Item name="userNameOrEmailAddress" rules={[{ required: true, message: "Please enter username!" }]} >
					<Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: "Please enter password!" }]} >
					<Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
				</Form.Item>
				<Form.Item name="rememberClient" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
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