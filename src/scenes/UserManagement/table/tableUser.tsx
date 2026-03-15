import { Button, Modal, Radio, Table } from "antd";
import React from "react";
import { Int64EntityDto, type UserDto } from "../../../services/services_autogen";
import moment from "moment";
import { formatPhoneNumber } from "../../../lib/appconst";
import { DeleteOutlined } from "@ant-design/icons";
import { stores } from "../../../stores/store";
interface IUserTableProps {
	listUser: UserDto[];
	getAllListUser: () => void;
	isLoading: boolean;
}

export default class TableUser extends React.Component<IUserTableProps> {
	updateIsActive = async (items: UserDto, value: boolean) => {
		let body = new Int64EntityDto(); 
		body.id = items.id;
		if(value) {
			await stores.userStore.activeUser(body);
		} else {
			await stores.userStore.deActivateUser(body);
		}
		await this.props.getAllListUser();
	};
	deleteUser = async (items: UserDto) => {
		const self = this
		Modal.confirm({
			title: "Bạn có chắc muốn xóa tài khoản này không?",
			content: "Xóa tài khoản.",
			okText: "Xóa",
			okType: "danger",
			cancelText: "Hủy",
			async onOk() {
				await stores.userStore.deleteUser(items.id);
				await self.props.getAllListUser();
			}
		});
	}
	render() {
		const { listUser,isLoading } = this.props;

		const columns = [
			{
				title: "Tên tài khoản",
				dataIndex: "userName",
				key: "userName",
			},
			{
				title: "Họ và tên",
				dataIndex: "fullName",
				key: "fullName",
			},
			{
				title: "Ngày sinh",
				dataIndex: "dateOfBirth",
				key: "dateOfBirth",
				render: (_text: string, item: UserDto) => item.dateOfBirth ? moment(item.dateOfBirth).format("DD/MM/YYYY") : "",
			},
			{
				title: "Số điện thoại",
				dataIndex: "phoneNumber",
				key: "phoneNumber",
				render: (_text: string, item: UserDto) => formatPhoneNumber(item.phoneNumber||""),
			},
			{
				title: "Địa chỉ email",
				dataIndex: "emailAddress",
				key: "emailAddress",
			},
			{
				title: "Vai trò",
				dataIndex: "roleNames",
				key: "roleNames",
				render: (roles: string[]) => (
					<>
						{roles?.map((role, index) => (
							<span key={index} style={{ marginRight: 8 }}>
								{role}
							</span>
						))}
					</>
				),
			},
			{
				title: "Hoạt động",
				dataIndex: "isActive",
				key: "isActive",
				render: (_: any, items: UserDto) => {
					if(items.userName === "admin") {
						return null;
					}
					return (
						<Radio.Group value={items.isActive} onChange={(e) => this.updateIsActive(items,e.target.value)}>
							<Radio value={true}>Có</Radio>
							<Radio value={false}>Không</Radio>
						</Radio.Group>
					);
				},
			},
			{
				title: "Hành động",
				key: "actions",
				render: (_: any, items: UserDto) => {
					if(items.userName === "admin") {
						return null;
					}
					return <Button type="dashed" onClick={()=>this.deleteUser(items)} style={{ marginRight: 8 }}><DeleteOutlined />Xóa</Button>;
				}
			},
		];

		return (
			<Table
				columns={columns}
				dataSource={listUser}
				rowKey="id"
				pagination={false}
				loading={isLoading}
			/>
		);
	}
}