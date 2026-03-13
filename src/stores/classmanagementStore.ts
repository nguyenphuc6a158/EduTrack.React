import type { CancelToken } from "axios";
import http from "../services/httpService";
import { ClassDto, ClassService } from "../services/services_autogen";

export default class ClassManagementStore {
	private classService: ClassService;
	constructor() {
		this.classService = new ClassService("",http);
	}
	getAllClassFromService = async (keyword: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined, cancelToken?: CancelToken) : Promise<ClassDto[]> => {
		let result = await this.classService.getAll(keyword, skipCount, maxResultCount, cancelToken||undefined);
		return result.items || [];
	}
}