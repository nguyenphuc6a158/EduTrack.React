
export class MEnum {
	num: number;
	name: string;
	color: string;
	icon: any;
	constructor(num: number | 0, name: string | '', color?: string, icon?: any) {
		this.num = num;
		this.name = name;
		this.color = color || 'green';
		this.icon = icon || '';
	}
}
const _getValue = (enu: MEnum[], val: number | undefined, col: 'name' | 'color' | 'icon'): string => {
	if (val !== undefined) {
		let item = enu.find((item) => item.num == val);
		if (item !== undefined) {
			return item[col];
		}
	}
	return '';
};
//---------------------------------------------------------------------------------------------------------

export const eGENDER = {
	FEMALE: new MEnum(0, 'Female'),
	MALE: new MEnum(1, 'Male'),
	OTHER: new MEnum(2, 'Other'),
};
export const valueOfeGENDER = (val: number | undefined) => {
	return _getValue(Object.values(eGENDER), val, 'name');
};
//---------------------------------------------------------------------------------------------------------


export enum BasicStatus {
	DISABLE = 0,
	ENABLE = 1,
}

export enum ResultEnum {
	SUCCESS = 0,
	ERROR = -1,
	TIMEOUT = 401,
}

export enum StorageEnum {
	UserInfo = 'userInfo',
	UserToken = 'userToken',
	Settings = 'settings',
	I18N = 'i18nextLng',
}

export enum ThemeMode {
	Light = 'light',
	Dark = 'dark',
}

export enum ThemeLayout {
	Vertical = 'vertical',
	Horizontal = 'horizontal',
	Mini = 'mini',
}

export enum ThemeColorPresets {
	Default = 'default',
	Cyan = 'cyan',
	Purple = 'purple',
	Blue = 'blue',
	Orange = 'orange',
	Red = 'red',
}

export enum LocalEnum {
	en_US = 'en_US',
	zh_CN = 'zh_CN',
	vi_VN = 'vi_VN',
}

export enum MultiTabOperation {
	FULLSCREEN = 'fullscreen',
	REFRESH = 'refresh',
	CLOSE = 'close',
	CLOSEOTHERS = 'closeOthers',
	CLOSEALL = 'closeAll',
	CLOSELEFT = 'closeLeft',
	CLOSERIGHT = 'closeRight',
}

export enum PermissionType {
	CATALOGUE = 0,
	MENU = 1,
	BUTTON = 2,
}
export enum ModeTableQuestionsEnum {
	QUESTION = 0,
	ASSIGNMENT = 1,
	ASSIGNMENT_SELECTED = 2
}
export enum ModeTabClassesEnum {
	CLASS = 0,
	ASSIGNMENT = 1,
	ASSIGNMENT_SELECTED = 2
}
export enum ModeViewFilePDF{
	DEMOQUESTIONVIEW = 0,
	ASSIGNMENTQUESTIONVIEW = 1
}
export enum DetailAssignmentActive{
	NOTSTARTED = 0,
	INPROGRESS = 1,
	COMPLATED = 2,
}