import http from "src/services/httpService";
import { CreateGradeDto, GradeDto, GradeService, UpdateGradeDto } from "src/services/services_autogen";
import { create } from 'zustand';
const gradeService = new GradeService('',http);
interface GradeState {
	listGradees: GradeDto[];
	gradeItem?: GradeDto;
	totalCountGrade: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateGradeDto) => Promise<void>;
		update: (body: UpdateGradeDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
	};
}
const useGradeStore = create<GradeState>((set) => ({
	listGradees: [],
	totalCountGrade: 0,
	loading: false,
	gradeItem: undefined,
	actions: {
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await gradeService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listGradees: result.items || [],
						totalCountGrade: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await gradeService.get(id);
				if(result){
					set({
						gradeItem: result
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		create : async (body) : Promise<void> => {
			await gradeService.create(body);
		},
		update: async (body) : Promise<void> => {
			await gradeService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await gradeService.delete(id);
		}
	}
}));

export const useGradees = () => useGradeStore((state) => state.listGradees);
export const useTotalCountGrade = () => useGradeStore((state) => state.totalCountGrade);
export const useGrade = () => useGradeStore((state) => state.gradeItem);
export const useGradeLoading = () => useGradeStore((state) => state.loading);
export const useGradeActions = () => useGradeStore((state) => state.actions);
export default useGradeStore;