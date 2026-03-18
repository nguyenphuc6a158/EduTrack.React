import React from "react";
import { RoleDto, type GetRoleForEditOutput } from "../../services/services_autogen";
import { Button, Card, Checkbox, Form, Input, message, Row } from "antd";
import { stores } from "../../stores/store";

interface IFormCreateOrUpdate {
	curGranted: GetRoleForEditOutput;
	selectedRole?: RoleDto;
	onCancel: () => void;
}

export default class FormCreateOrUpdateRole extends React.Component<IFormCreateOrUpdate> {
	state={
		isLoading: true
	};
	optionPermissionCheckBox: { label: string; value: string }[] = [];
	formRef = React.createRef<any>();
	componentDidMount = () => {
		const {curGranted, selectedRole} = this.props
		this.setState({isLoading: true});
		this.optionPermissionCheckBox = curGranted.permissions?.map(item=>({
			label: item.displayName || "",
			value: item.name || "",
		})) || [];
		if(selectedRole != undefined){
			this.formRef.current?.setFieldsValue({
				name: selectedRole.name,
				displayName: selectedRole.displayName,
				description: selectedRole.description,
				grantedPermissions: curGranted.grantedPermissionNames
			});
		}
		this.setState({isLoading: false});
	}
	componentDidUpdate = (prePros: IFormCreateOrUpdate) => {
		const {curGranted, selectedRole} = this.props
		if(prePros.selectedRole != selectedRole && selectedRole != undefined){
			this.optionPermissionCheckBox = curGranted.permissions?.map(item=>({
				label: item.displayName || "",
				value: item.name || "",
			})) || [];
			if(selectedRole != undefined){
				this.formRef.current?.setFieldsValue({
					name: selectedRole.name,
					displayName: selectedRole.displayName,
					description: selectedRole.description,
					grantedPermissions: curGranted.grantedPermissionNames
				});
			}
		}
		if(selectedRole == undefined){
			this.formRef.current?.resetFields();
		}
	}
	handelSubmit = (value: any) => {
		let input = new RoleDto()
		input.name = value.name;
		input.displayName = value.displayName;
		input.description = value.description;
		input.normalizedName = value.displayName.toUpperCase();
		input.grantedPermissions = value.grantedPermissions;
		stores.roleStore.createOrUpdateRole(input, this.props.selectedRole);
		message.success(this.props.selectedRole? "Cập nhật thông tin vai trò thành công" : "Thêm mới vai trò thành công");
		this.props.onCancel();
	}
	render(): React.ReactNode {
		const { selectedRole, onCancel } = this.props;

		let title = "Thêm mới vai trò";
		if (selectedRole != undefined) {
			title = "Sửa vai trò";
		}
		return(
			<Card>
				<Row style={{marginBottom:"10px"}}>
					<h2>{title}</h2>
				</Row>
				<Row>
					<Form onFinish={(value)=>this.handelSubmit(value)} ref={this.formRef}>
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
							/>
						</Form.Item>
						<Form.Item style={{ textAlign: "center" , marginBottom: 0 }}>
							<Button htmlType="submit" type="primary">{selectedRole? "Sửa" : "Thêm"}</Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="dashed" onClick={onCancel}>Hủy</Button>
						</Form.Item>
					</Form>
				</Row>
			</Card>
		)
	}
}