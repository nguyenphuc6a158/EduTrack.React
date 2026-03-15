import http from "../services/httpService";
import { SessionService } from "../services/services_autogen";

export default class SessionStore {
	private sessionService : SessionService;
	constructor(){
		this.sessionService = new SessionService("",http);
	}
	getCurrentLoginInformationsFromService = async () => {
		let result = await this.sessionService.getCurrentLoginInformations();
		return result
	}
}