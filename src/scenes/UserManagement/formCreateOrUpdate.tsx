import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import React from "react"
import type { RoleDto } from "../../services/services_autogen";
import { stores } from "../../stores/store";

interface IFormCreateOrUpdateProps {
	onCancel: () => void;
	listRole: RoleDto[];
	getAllListUser: () => void;
}

export default class FormCreateOrUpdate extends React.Component<IFormCreateOrUpdateProps>{

	handleSubmit = async (values: any) => {
		const { onCancel, getAllListUser } = this.props;
		await stores.userStore.createOrUpdateUserFromService(values);
		onCancel();
		await getAllListUser();
	}

	render() {
		const { onCancel, listRole } = this.props;
		return (
			<Card>
				<Form onFinish={(values) => this.handleSubmit(values)}>
					<Form.Item label="Tên tài khoản" name="userName" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item label="Họ" name="surname" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Tên" name="name" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true }]}>
						<DatePicker format="DD/MM/YYYY" />
					</Form.Item>
					<Form.Item label="Email" name="emailAddress" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Vai trò" name="roleNames" rules={[{ required: true }]}>
						<Select mode="multiple" placeholder="Chọn vai trò">
							{listRole.map((role) => (
								<Select.Option key={role.id} value={role.name}>
									{role.displayName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item style={{ textAlign: "center" , marginBottom: 0 }}>
						<Button type="primary" htmlType="submit">
							Thêm
						</Button>
						&nbsp;&nbsp;
						<Button type="dashed" onClick={() =>onCancel()}>
							Hủy
						</Button>
					</Form.Item>
				</Form>
			</Card>
		);
	}
}