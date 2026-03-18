import {jwtDecode} from "jwt-decode";

export const isAuthenticated = () => {
	const token = localStorage.getItem("accessToken");
	if (!token) return false;

	const decoded: any = jwtDecode(token);

	if (decoded.exp * 1000 < Date.now()) {
		localStorage.logout();
		return false;
	}

	return true;
};