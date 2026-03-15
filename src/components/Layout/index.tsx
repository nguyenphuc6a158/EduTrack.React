import { Layout, Menu } from "antd";
import React from "react";
const { Content, Sider } = Layout;
import HeaderLayout from "./headerLayout";
import itemsMenuLayout from "../Router/itemsMenuLayout";
import { Outlet } from "react-router-dom";
import { stores } from "../../stores/store";
export default class MainLayout extends React.Component {
	state = {
		closeSider: false,
		isLoding: true,
	};
	async componentDidMount () {
		this.setState({isLoading: true});
		await stores.sessionStore.getCurrentLoginInformationsFromService();
		console.log(window.abp.auth.isGranted("Pages.Users"))
		this.setState({isLoading: false});
	}
	toggleSider = () => {
		this.setState({closeSider: !this.state.closeSider});
	}
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
						defaultSelectedKeys={[location.pathname]}
						items={itemsMenuLayout}
        			/>
      			</Sider>
				<Layout>
					<HeaderLayout
						closeSider={this.state.closeSider}
						toggleSider={this.toggleSider}
					/>
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