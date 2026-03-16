import AuthenticationStore from "./authenticationStore";
import ClassStore from "./classStore";
import RoleStore from "./roleStore";
import UserStore from "./userStore";

function initializeStores() {
	return {
		authenticationStore: new AuthenticationStore(),
		classStore: new ClassStore(),
		userStore: new UserStore(),
		roleStore: new RoleStore(),
	};
}
export  const stores = initializeStores();