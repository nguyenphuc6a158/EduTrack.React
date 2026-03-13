import { Button, Card, Form, Input } from "antd";
import React from "react";
interface IFormCreatOrUpdateClassmanagementProps {
	onCancel?: () => void;
}
export default class FormCreatOrUpdateClassmanagement extends React.Component<IFormCreatOrUpdateClassmanagementProps> {
	render() {
		const { onCancel } = this.props;
		return (
			<Card>
				<Form
					name="wrap"
					labelCol={{ flex: '110px' }}
					labelAlign="left"
					labelWrap
					wrapperCol={{ flex: 1 }}
					colon={false}
					onFinish={(values) => {console.log(values);}}
				>
					<Form.Item label="Tên lớp" name="className" rules={[{ required: true }]}>
						<Input />
					</Form.Item>

					<Form.Item label="Khối" name="level" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Giáo viên" name="teacherID" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item style={{ textAlign: "center" , marginBottom: 0 }}>
						<Button type="primary" htmlType="submit">
							Thêm mới
						</Button>
						&nbsp;&nbsp;
						<Button type="dashed" onClick={onCancel}>
							Hủy
						</Button>
					</Form.Item>
				</Form>
			</Card>
			
		)
	}
}