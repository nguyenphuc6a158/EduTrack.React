import http from "src/services/httpService";
import { AssignmentDto, AssignmentService, CreateAssignmentDto, UpdateAssignmentDto } from "src/services/services_autogen";
import { create } from 'zustand';
const assignmentService = new AssignmentService('',http);
interface AssignmentState {
	listAssignments: AssignmentDto[];
	assignmentItem?: AssignmentDto;
	totalCountAssignment: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateAssignmentDto) => Promise<void>;
		update: (body: UpdateAssignmentDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
	};
}
const useAssignmentStore = create<AssignmentState>((set) => ({
	listAssignments: [],
	totalCountAssignment: 0,
	loading: false,
	assignmentItem: undefined,
	actions: {
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await assignmentService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listAssignments: result.items || [],
						totalCountAssignment: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await assignmentService.get(id);
				if(result){
					set({
						assignmentItem: result
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		create : async (body) : Promise<void> => {
			await assignmentService.create(body);
		},
		update: async (body) : Promise<void> => {
			await assignmentService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await assignmentService.delete(id);
		}
	}
}));

export const useAssignments = () => useAssignmentStore((state) => state.listAssignments);
export const useAssignment = () => useAssignmentStore((state) => state.assignmentItem);
export const usetotalCountAssignment = () => useAssignmentStore((state) => state.totalCountAssignment);
export const useAssignmentLoading = () => useAssignmentStore((state) => state.loading);
export const useAssignmentActions = () => useAssignmentStore((state) => state.actions);
export default useAssignmentStore;