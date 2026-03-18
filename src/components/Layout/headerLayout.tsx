import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import itemsMenuProps from "../Router/itemsMenuProps"
import { stores } from "../../stores/store";
interface IHeaderLayoutProps {
	closeSider: boolean;
	toggleSider: () => void;
}
export default class HeaderLayout extends React.Component<IHeaderLayoutProps> {
	state = {
		openDropdown: false,
	};
	selectItemMenuDropdown = (item: any) => {
		if(item.key == "/logout"){
			stores.authenticationStore.logout();
		} else window.location.href = item.key
	}
	render() {
		const { closeSider, toggleSider } = this.props;
		return (
			<Header style={{width: '100%', padding: 0, background: '#f3dfdf', display: 'flex'}}>
				<Col span={1}>
					<Button
						type="text"
						icon={closeSider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={toggleSider}
						style={{
						fontSize: '16px',
						width: 64,
						height: 64,
						}}
					/>
				</Col>
				<Col span={23} style={{ textAlign: "right", paddingRight: 50 }}>
					<Dropdown 
						menu={{ 
							items: itemsMenuProps,
							onClick: (item) => this.selectItemMenuDropdown(item)
						}}
						trigger={['click']}
					>
						<Space>
							<Avatar size="large" icon={<UserOutlined />} />
						</Space>
					</Dropdown>
				</Col>
			</Header>
		)
	}
}