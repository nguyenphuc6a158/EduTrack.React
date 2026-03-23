import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routers, type IMenuItem } from "./router.config";
import Login from "../../scenes/Login";
import ProtectedRoute from "./protectedRouter";
import { isGrantedByPrefix } from "../../lib/abpUtility";
import { MainLayout } from "../Layout";

const renderRoutes: any = (items: IMenuItem[]) => {
	return items
		.filter(item => item.permissions === '' || isGrantedByPrefix(item.permissions))
		.flatMap(item => {
			const routes = [];
			if (item.path && item.component) {
				const Component = item.component;
				routes.push(
					<Route
						key={item.key}
						path={item.path === '/' ? '' : item.path}
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<Component />
							</Suspense>
						}
					/>
				);
			}
			if (item.children) {
				routes.push(...renderRoutes(item.children));
			}
			return routes;
		});
};

export const Router = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				{renderRoutes(routers)}
			</Route>
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
};