import { AppConsts } from "src/lib/appconst";
import http from "src/services/httpService";
import { FileService, type FileParameter } from "src/services/services_autogen";
import { create } from 'zustand';
const fileService = new FileService('',http);
interface FileState {
	actions: {
		delete: (url: string) => Promise<void>,
		upload: (fileUrl: FileParameter) => Promise<string>,
	};
}
const useFileStore = create<FileState>((set) => ({
	actions: {
		upload: async (file) => {
			const res = await fileService.uploadFile(file);
			return res.url || "";
		},
		delete: async (fileUrl: string) => {
			await fileService.deleteFile(fileUrl);
		}
	}
}));
export const useFileActions = () => useFileStore((state) => state.actions)
export default useFileStore;