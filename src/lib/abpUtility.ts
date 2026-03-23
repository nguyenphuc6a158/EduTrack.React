import { AppConsts } from './appconst';

declare var abp: any;

export function L(key: string, sourceName?: string): string {
	let localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
	return abp.localization.localize(key, sourceName ? sourceName : localizationSourceName);
}
export function parseL(text: string): string {
	return text.replace(/L\(["'](.+?)["']\)/g, (_, key) => L(key));
}
export function isGranted(permissionName: string | string[]): boolean {
	if (Array.isArray(permissionName) == true) {
		for (let item of permissionName) {
			if (abp.auth.isGranted(item) == true) {
				return true;
			}
		}
		return false;
	} else {
		return abp.auth.isGranted(permissionName);
	}
}
export function isGrantedByPrefix(permissionName: string | string[]): boolean {
	if (Array.isArray(permissionName)) {
		for (let item of permissionName) {
			if (abp.auth.isGrantedByPrefix(item)) {
				return true;
			}
		}
		return false;
	}
	return abp.auth.isGrantedByPrefix(permissionName);
}
