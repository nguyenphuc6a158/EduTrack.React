import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import utils from "src/utils/utils";

interface Props {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
	if (!utils.isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default ProtectedRoute;