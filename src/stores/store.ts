import AuthenticationStore from "./authenticationStore";

function initializeStores() {
	return {
		authenticationStore: new AuthenticationStore(),
	};
}
export  const stores = initializeStores();