import { Form, Input, Modal } from "antd";
import type React from "react";
import { requiredRule } from "src/lib/validation";
interface IUserResetPasswordModalProps{
	open: boolean
	onCancel: ()=>void;
	onOk: (value: any) => Promise<void>;
}
const UserResetPasswordModal: React.FC<IUserResetPasswordModalProps> = ({open, onCancel, onOk}) => {
	const [form] = Form.useForm();
	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			await onOk(values);
		} catch (error) {
			form.setFields([
				{
					name: "adminPassword",
					errors: ["Mật khẩu admin không chính xác !!"],
				},
			]);
		}
	};
	return (
		<Modal
			title={"Lấy lại mật khẩu"}
			open={open}
			onCancel={onCancel}
			onOk={handleOk}
		>
			<Form form={form}>
				<Form.Item name="adminPassword" label="Mật khẩu của Admin" rules={[requiredRule("Mật khẩu của Admin")]}>
					<Input.Password placeholder="Nhập mật khẩu của Admin"/>
				</Form.Item>
				<Form.Item name="newPassword" label="Mật khẩu mới của người dùng" rules={[requiredRule("Mật khẩu mới của người dùng")]}>
					<Input.Password placeholder="Nhập mật khẩu của người dùng"/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default UserResetPasswordModal