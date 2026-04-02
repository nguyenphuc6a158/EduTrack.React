import http from "src/services/httpService";
import { CreateStudentClassDto, StudentClassDto, StudentClassService, UpdateStudentClassDto } from "src/services/services_autogen";
import { create } from 'zustand';
const studentClassService = new StudentClassService('',http);
interface StudentClassState {
	listStudentClasses: StudentClassDto[];
	studentClassItem?: StudentClassDto;
	totalCountStudentClass: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateStudentClassDto) => Promise<void>;
		update: (body: UpdateStudentClassDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
		getStudentClassByClass: (classId: number) => Promise<void>;
	};
}
const useStudentClassStore = create<StudentClassState>((set) => ({
	listStudentClasses: [],
	totalCountStudentClass: 0,
	loading: false,
	studentClassItem: undefined,
	actions: {
		getStudentClassByClass:async (id) => {
			set({ loading: true });
			try{
				const result = await studentClassService.getStudentByClass(undefined, undefined, undefined, id);
				if(result){
					set({
						listStudentClasses: result.items || [],
						totalCountStudentClass: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await studentClassService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listStudentClasses: result.items || [],
						totalCountStudentClass: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await studentClassService.get(id);
				if(result){
					set({
						studentClassItem: result
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		create : async (body) : Promise<void> => {
			await studentClassService.create(body);
		},
		update: async (body) : Promise<void> => {
			await studentClassService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await studentClassService.delete(id);
		}
	}
}));

export const useStudentClasses = () => useStudentClassStore((state) => state.listStudentClasses);
export const useStudentClass = () => useStudentClassStore((state) => state.studentClassItem);
export const useStudentClassLoading = () => useStudentClassStore((state) => state.loading);
export const useStudentClassActions = () => useStudentClassStore((state) => state.actions);
export const useTotalCountStudentClass = () => useStudentClassStore((state) => state.totalCountStudentClass);
export default useStudentClassStore;