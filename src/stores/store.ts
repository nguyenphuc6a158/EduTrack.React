import AuthenticationStore from "./authenticationStore";
import ClassStore from "./classStore";
import RoleStore from "./roleStore";
import SessionStore from "./sessionStore";
import UserStore from "./userStore";

function initializeStores() {
	return {
		authenticationStore: new AuthenticationStore(),
		classStore: new ClassStore(),
		userStore: new UserStore(),
		roleStore: new RoleStore(),
		sessionStore: new SessionStore()
	};
}
export  const stores = initializeStores();