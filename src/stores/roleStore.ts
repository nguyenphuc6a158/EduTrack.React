import type { CancelToken } from "axios";
import http from "../services/httpService";
import { GetRoleForEditOutput, PermissionDto, RoleDto, RoleService } from "../services/services_autogen";

export default class RoleStore {
	private roleService: RoleService;
	constructor() {
		this.roleService = new RoleService('',http);
	}
	getAllRoleFromService = async (keyword: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined, cancelToken?: CancelToken) : Promise<RoleDto[]> => {
		let result = await this.roleService.getAll(keyword, sorting, skipCount, maxResultCount, cancelToken||undefined);
		return result.items || [];
	}
	getAllPermissions = async () : Promise<PermissionDto[]>  => {
		let result = await this.roleService.getAllPermissions();
		return result.items || [];
	}
	getRoleForEdit = async (RoleId: number | undefined, cancelToken?: CancelToken) : Promise<GetRoleForEditOutput> => {
		let result = await this.roleService.getRoleForEdit(RoleId, cancelToken);
		return result || [];
	}
}