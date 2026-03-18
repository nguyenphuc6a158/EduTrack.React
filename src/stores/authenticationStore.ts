import http from '../services/httpService';
import { AuthenticateModel, TokenAuthService  } from '../services/services_autogen';
import type LoginModel from '../services/tokenAuth/loginModel';
declare var abp: any;
export default class AuthenticationStore {
	private tokenAuthService: TokenAuthService;
	constructor() {
		this.tokenAuthService = new TokenAuthService("",http);
	}
	login = async (inputByForm: LoginModel) => {
		let input = new AuthenticateModel({
			userNameOrEmailAddress: inputByForm.username,
			password: inputByForm.password,
			rememberClient: inputByForm.remember
		});
		let result = await this.tokenAuthService.authenticate(input);
		
		localStorage.setItem("accessToken", result.accessToken!);
		localStorage.setItem("encryptedAccessToken", result.encryptedAccessToken!);
		localStorage.setItem("userId", result.userId?.toString() || "");
	}
	logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("encryptedAccessToken");
		localStorage.removeItem("userId");
		localStorage.removeItem("greantedPermission");
		window.location.href = "/login"
	};
}