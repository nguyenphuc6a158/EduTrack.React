import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import menuItems from "./router.config";
import MainLayout from "../Layout";
import Login from "../../scenes/Login";
import ProtectedRoute from "./protectedRouter";
export class Router extends React.Component {
	render() {
		return ( 
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}>
						{menuItems.map(item => {return <Route path={item.path} key={item.key} element={<item.component />}/>;})}
					</Route>
				</Routes>
			</BrowserRouter>
		);
	}
}