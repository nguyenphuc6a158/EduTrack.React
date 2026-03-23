import { L } from '../lib/abpUtility';
import { routers } from '../components/Router/router.config';

declare var abp: any;

class Utils {
	loadScript(url: string) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		document.body.appendChild(script);
	}

	extend(...args: any[]) {
		let options,
			name,
			src,
			srcType,
			copy,
			copyIsArray,
			clone,
			target = args[0] || {},
			i = 1,
			length = args.length,
			deep = false;

		if (typeof target === 'boolean') {
			deep = target;
			target = args[i] || {};
			i++;
		}
		if (typeof target !== 'object' && typeof target !== 'function') {
			target = {};
		}
		if (i === length) {
			target = this;
			i--;
		}
		for (; i < length; i++) {
			if ((options = args[i]) !== null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					}
					srcType = Array.isArray(src) ? 'array' : typeof src;
					if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && srcType === 'array' ? src : [];
						} else {
							clone = src && srcType === 'object' ? src : {};
						}
						target[name] = this.extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	}

	findRouteByPath = (path: string, items: any[]): any => {
		for (const item of items) {
			if (item.path === path) return item;
			if (item.children) {
				const found = this.findRouteByPath(path, item.children);
				if (found) return found;
			}
		}
		return null;
	};

	getPageTitle = (pathname: string) => {
		const route = this.findRouteByPath(pathname, routers);
		const localizedAppName = L('EduTrack');
		if (!route) {
			return localizedAppName;
		}

		return route.label + ' | ' + localizedAppName;
	};

	getRoute = (path: string): any => {
		return this.findRouteByPath(path, routers);
	};

	findKeysByPath = (path: string, items: any[]): { selectedKey: string; openKeys: string[] } => {
		let selectedKey = '';
		let openKeys: string[] = [];

		const search = (nodes: any[], parentKeys: string[]): boolean => {
			for (const node of nodes) {
				if (node.path === path) {
					selectedKey = node.key;
					openKeys = parentKeys;
					return true;
				}
				if (node.children) {
					if (search(node.children, [...parentKeys, node.key])) {
						return true;
					}
				}
			}
			return false;
		};

		search(items, []);
		return { selectedKey, openKeys };
	};

	setLocalization() {
		if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
			let language = navigator.language;
			abp.utils.setCookieValue('Abp.Localization.CultureName', language, new Date(new Date().getTime() + 5 * 365 * 86400000), abp.appPath);
		}
	}

	getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
		if (currentProviderName === 'unspecifiedClockProvider') {
			return abp.timing.unspecifiedClockProvider;
		}

		if (currentProviderName === 'utcClockProvider') {
			return abp.timing.utcClockProvider;
		}

		return abp.timing.localClockProvider;
	}

	isAuthenticated() {
		return !!localStorage.getItem("accessToken");
	}
}

export default new Utils();
