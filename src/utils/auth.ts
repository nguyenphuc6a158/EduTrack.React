import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
	const token = Cookies.get("accessToken");
	return !!token;
};

export const logout = () => {
  Cookies.remove("accessToken");
};