export const isGranted = (permission: string) => {
	return (window as any).abp?.auth?.isGranted(permission);
};