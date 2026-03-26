import http from "src/services/httpService";
import { ClassDto, ClassService, CreateClassDto, UpdateClassDto } from "src/services/services_autogen";
import { create } from 'zustand';
const classService = new ClassService('',http);
interface ClassState {
	listClasses: any[];
	classItem?: ClassDto;
	totalCountClass: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateClassDto) => Promise<void>;
		update: (body: UpdateClassDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
	};
}
const useClassStore = create<ClassState>((set) => ({
	listClasses: [],
	totalCountClass: 0,
	loading: false,
	classItem: undefined,
	actions: {
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await classService.getAll(keyword, skipCount, maxResultCount);
				console.log("Fetched clsaaaaaaaaaaaaaaaaaasses:");
				if(result){
					set({
						listClasses: result.items || [],
						totalCountClass: result.items?.length  || 0
					})
				}
			} finally {
                set({ loading: false });
            }
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await classService.get(id);
				if(result){
					set({
						classItem: result
					})
				}
			} finally {
                set({ loading: false });
            }
		},
		create : async (body) : Promise<void> => {
			await classService.create(body);
		},
		update: async (body) : Promise<void> => {
			await classService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await classService.delete(id);
		}
	}
}));

export const useClasses = () => useClassStore((state) => state.listClasses);
export const useClass = () => useClassStore((state) => state.classItem);
export const useClassLoading = () => useClassStore((state) => state.loading);
export const useClassActions = () => useClassStore((state) => state.actions);
export default useClassStore;