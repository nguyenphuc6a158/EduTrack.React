import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import menuItems from "./router.config";
import MainLayout from "../Layout";
export class Router extends React.Component {
	render() {
		return ( 
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{menuItems.map(item => {return <Route path={item.path} key={item.key} element={<item.component />}/>;})}
					</Route>
				</Routes>
			</BrowserRouter>
		);
	}
}