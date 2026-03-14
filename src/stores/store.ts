import AuthenticationStore from "./authenticationStore";
import ClassStore from "./classStore";
import UserStore from "./userStore";

function initializeStores() {
	return {
		authenticationStore: new AuthenticationStore(),
		classStore: new ClassStore(),
		userStore: new UserStore(),
	};
}
export  const stores = initializeStores();