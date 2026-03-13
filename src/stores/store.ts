import AuthenticationStore from "./authenticationStore";
import ClassManagementStore from "./classmanagementStore";

function initializeStores() {
	return {
		authenticationStore: new AuthenticationStore(),
		classManagementStore: new ClassManagementStore()
	};
}
export  const stores = initializeStores();