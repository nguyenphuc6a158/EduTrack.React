import http from '../services/httpService';
import { AuthenticateModel, TokenAuthService } from '../services/services_autogen';
export default class AuthenticationStore {
	private tokenAuthService: TokenAuthService;
	constructor() {
		this.tokenAuthService = new TokenAuthService("", http);
	}
	login = async (inputByForm: AuthenticateModel) => {
		let input = new AuthenticateModel({
			userNameOrEmailAddress: inputByForm.userNameOrEmailAddress,
			password: inputByForm.password,
			rememberClient: inputByForm.rememberClient
		});
		let result = await this.tokenAuthService.authenticate(input);

		localStorage.setItem("accessToken", result.accessToken!);
		localStorage.setItem("encryptedAccessToken", result.encryptedAccessToken!);
		localStorage.setItem("userId", result.userId?.toString() || "");
		// var tokenExpireDate = input.rememberClient ? new Date(new Date().getTime() + 1000 * result.expireInSeconds!) : undefined;
		// localStorage.setItem("tokenExpireDate", tokenExpireDate ? tokenExpireDate.toISOString() : "");
		// document.cookie = `AuthToken=${result.accessToken}; path=/;`;
		// abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, result.encryptedAccessToken!, tokenExpireDate, abp.appPath);
		// abp.utils.setCookieValue(AppConsts.authorization.userId, result.userId!.toString(), tokenExpireDate, abp.appPath);
	}
	logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("encryptedAccessToken");
		localStorage.removeItem("userId");
		window.location.href = "/login";
	}
}