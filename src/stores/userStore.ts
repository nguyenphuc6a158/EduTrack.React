import type { CancelToken } from "axios";
import http from "../services/httpService";
import { CreateUserDto, Int64EntityDto, UserDto, UserService } from "../services/services_autogen";

export default class UserStore {
	private userService: UserService;
	constructor() {
		this.userService = new UserService("", http);
	}
	createOrUpdateUserFromService = async (value: any) => {

		if (value.id) {
			let input = new UserDto();
			input.id = value.id;
			input.userName = value.userName;
			input.name = value.name;
			input.surname = value.surname;
			input.emailAddress = value.emailAddress;
			input.phoneNumber = value.phoneNumber;
			input.dateOfBirth = value.dateOfBirth;
			input.roleNames = value.roleNames;
			input.isActive = value.isActive;
			await this.userService.update(input);
		}else {
			let createUserDto = new  CreateUserDto();
			createUserDto.userName = value.userName;
			createUserDto.password = value.password;
			createUserDto.name = value.name;
			createUserDto.surname = value.surname;
			createUserDto.emailAddress = value.emailAddress || "";
			createUserDto.phoneNumber = value.phoneNumber;
			createUserDto.dateOfBirth = value.dateOfBirth.toDate();
			createUserDto.roleNames = value.roleNames || [];
			createUserDto.isActive = value.isActive || false;
			await this.userService.create(createUserDto);
		}
	}
	deActivateUser = async (body: Int64EntityDto | undefined, cancelToken?: CancelToken) => {
		await this.userService.deActivate(body, cancelToken||undefined);
	}
	activeUser = async (body: Int64EntityDto | undefined, cancelToken?: CancelToken) => {
		await this.userService.activate(body, cancelToken||undefined);
	}
	deleteUser = async (id: number | undefined, cancelToken?: CancelToken) => {
		await this.userService.delete(id, cancelToken||undefined);
	}
	getAllUserFromService = async (keyword: string | undefined, isActive: boolean | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined, cancelToken?: CancelToken) : Promise<UserDto[]> => {
		let result = await this.userService.getAll(keyword, isActive, sorting, skipCount, maxResultCount, cancelToken||undefined);
		return result.items || [];
	}
}