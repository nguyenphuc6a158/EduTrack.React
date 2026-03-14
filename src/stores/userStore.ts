import type { CancelToken } from "axios";
import http from "../services/httpService";
import { UserDto, UserService } from "../services/services_autogen";

export default class UserStore {
	private userService: UserService;
	constructor() {
		this.userService = new UserService("", http);
	}
	getAllUserFromService = async (keyword: string | undefined, isActive: boolean | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined, cancelToken?: CancelToken) : Promise<UserDto[]> => {
		let result = await this.userService.getAll(keyword, isActive, sorting, skipCount, maxResultCount, cancelToken||undefined);
		return result.items || [];
	}
}