import axios from "axios";
import { AppConsts } from "../lib/appconst";
import qs from "qs";

const http = axios.create({
	baseURL: AppConsts.remoteServiceBaseUrl,
	timeout: 3000000,
	paramsSerializer: function (params) {
		return qs.stringify(params, {
			encode: false,
		});
	},
});

http.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("accessToken");
			window.location.replace("/login");
		}
		return Promise.reject(error);
	}
);

export default http;
