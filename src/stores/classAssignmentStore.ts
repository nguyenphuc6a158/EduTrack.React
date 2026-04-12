import http from "src/services/httpService";
import { CreateClassAssignmentDto, ClassAssignmentDto, ClassAssignmentService, UpdateClassAssignmentDto, CreateListClassAssgnmentDto } from "src/services/services_autogen";
import { create } from 'zustand';
const classAssignmentService = new ClassAssignmentService('',http);
interface ClassAssignmentState {
	listClassAssignments: ClassAssignmentDto[];
	classAssignmentItem?: ClassAssignmentDto;
	totalCountClassAssignment: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateClassAssignmentDto) => Promise<void>;
		update: (body: UpdateClassAssignmentDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
		createListClassAssignment: (body: CreateListClassAssgnmentDto) => Promise<void>;
		getAllClassAssignmentByCreaterUserId: (createrUserId: number) => Promise<void>;
	};
}
const useClassAssignmentStore = create<ClassAssignmentState>((set) => ({
	listClassAssignments: [],
	totalCountClassAssignment: 0,
	loading: false,
	classAssignmentItem: undefined,
	actions: {
		getAllClassAssignmentByCreaterUserId: async (createrUserId) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await classAssignmentService.getAllClassAssignmentByCreaterUserId(createrUserId);
				if(result){
					set({
						listClassAssignments: result.items || [],
						totalCountClassAssignment: result.totalCount  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		createListClassAssignment: async (body) : Promise<void> => {
			try {
				await classAssignmentService.createListClassAssignment(body);
			} catch (error) {
				console.error("Error creating list class assignment:", error);
			}
		},
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await classAssignmentService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listClassAssignments: result.items || [],
						totalCountClassAssignment: result.totalCount  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await classAssignmentService.get(id);
				if(result){
					set({
						classAssignmentItem: result
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		create : async (body) : Promise<void> => {
			await classAssignmentService.create(body);
		},
		update: async (body) : Promise<void> => {
			await classAssignmentService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await classAssignmentService.delete(id);
		}
	}
}));

export const useClassAssignments = () => useClassAssignmentStore((state) => state.listClassAssignments);
export const useTotalCountClassAssignment = () => useClassAssignmentStore((state) => state.totalCountClassAssignment);
export const useClassAssignment = () => useClassAssignmentStore((state) => state.classAssignmentItem);
export const useClassAssignmentLoading = () => useClassAssignmentStore((state) => state.loading);
export const useClassAssignmentActions = () => useClassAssignmentStore((state) => state.actions);
export default useClassAssignmentStore;