export const colResponsive = (xs: number, sm: number, md: number, lg: number, xl: number, xxl: number) => {
	return {
		xs: { span: xs },
		sm: { span: sm },
		md: { span: md },
		lg: { span: lg },
		xl: { span: xl },
		xxl: { span: xxl },
	};
};
export const formatPhoneNumber = (phoneNumber: string) => {
	return phoneNumber ? phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3") : "";
};
export const AppConsts = {
	remoteServiceBaseUrl: import.meta.env.VITE_API_BASE_URL,
};