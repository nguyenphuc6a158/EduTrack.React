import { MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import React from "react";
const { Header, Content, Sider } = Layout;
import menuItems from "../Router/router.config";
import { Link, Outlet } from "react-router-dom";
export default class MainLayout extends React.Component {
	state = {
		closeSider: false,
	};
	render() {
		return (
			<Layout style={{minHeight: "100vh" }}>
      			<Sider width={"15%"} trigger={null} collapsible collapsed={this.state.closeSider}>
        			<div
						style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "#001529",
						}}
					>
						<img
						src="/logo.png"
						alt="logo"
						style={{
							width: this.state.closeSider ? 50 : 150,
							objectFit: "contain",
						}}
						/>
					</div>
        			<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}
						items={menuItems.map(item => {
							return {
								key: item.key,
								icon: item.icon,
								label: <Link to={item.path}>{item.title}</Link>,
							}
						})}
        			/>
      			</Sider>
				<Layout>
					<Header style={{width: '100%', padding: 0, background: '#e1d7d7'}}>
						<Button
							type="text"
							icon={this.state.closeSider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => this.setState({closeSider: !this.state.closeSider})}
							style={{
							fontSize: '16px',
							width: 64,
							height: 64,
							}}
						/>
					</Header>
					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
    		</Layout>
		)
	}
}