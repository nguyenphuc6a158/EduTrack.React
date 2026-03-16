import React from "react";
import type { GetRoleForEditOutput, RoleDto } from "../../services/services_autogen";
import { Card, Checkbox, Form, Input, Row } from "antd";

interface IFormCreateOrUpdate {
	curGranted: GetRoleForEditOutput;
	roleSelected?: RoleDto;
}

export default class FormCreateOrUpdateRole extends React.Component<IFormCreateOrUpdate> {
	state={
		isLoading: true
	};
	optionPermissionCheckBox: { label: string; value: string }[] = [];
	formRef = React.createRef<any>();
	componentDidMount = () => {
		const {curGranted, roleSelected} = this.props
		this.setState({isLoading: true});
		this.optionPermissionCheckBox = curGranted.permissions?.map(item=>({
			label: item.displayName || "",
			value: item.name || "",
		})) || [];
		if(roleSelected != undefined){
			this.formRef.current?.setFieldsValue({
				name: roleSelected.name,
				displayName: roleSelected.displayName,
				description: roleSelected.description,
				grantedPermissions: curGranted.grantedPermissionNames
			});
		}
		this.setState({isLoading: false});
	}
	render(): React.ReactNode {
		const { roleSelected } = this.props;

		let title = "Thêm mới vai trò";
		if (roleSelected != undefined) {
			title = "Sửa vai trò";
		}
		return(
			<Card>
				<Row>
					<h2>{title}</h2>
				</Row>
				<Row>
					<Form ref={this.formRef}>
						<Form.Item label="Tên vai trò" name={"name"} required>
							<Input></Input>
						</Form.Item>
						<Form.Item label="Tên hiển thị" name={"displayName"} required>
							<Input></Input>
						</Form.Item>
						<Form.Item label="Mô tả" name={"description"}>
							<Input></Input>
						</Form.Item>
						<Form.Item label="Quyền" name={"grantedPermissions"}>
							<Checkbox.Group 
								options={this.optionPermissionCheckBox}
								onChange={(list) => console.log(list)} 
							/>
						</Form.Item>
					</Form>
				</Row>
			</Card>
		)
	}
}