import http from "src/services/httpService";
import { AssignmentDto, AssignmentService, CreateAssignmentDto, CreateAssignmentWithQuestionsDto, DetailAssignmentForStudentDto, UpdateAssignmentDto, UpdateAssignmentWithQuestionsDto } from "src/services/services_autogen";
import { create } from 'zustand';
const assignmentService = new AssignmentService('',http);
interface AssignmentState {
	listAssignments: AssignmentDto[];
	listDetailAssignmentForAssignment: DetailAssignmentForStudentDto [];
	assignmentItem?: AssignmentDto;
	totalCountAssignment: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateAssignmentDto) => Promise<void>;
		update: (body: UpdateAssignmentDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
		createAssignmentWithQuestions: (body: CreateAssignmentWithQuestionsDto) => Promise<void>;
		updateAssignmentWithQuestions: (body: UpdateAssignmentWithQuestionsDto) => Promise<void>;
		getAllAssignmentForStudent: (studentId?: number, chapterId?: number, keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
	};
}
const useAssignmentStore = create<AssignmentState>((set) => ({
	listAssignments: [],
	totalCountAssignment: 0,
	loading: false,
	assignmentItem: undefined,
	listDetailAssignmentForAssignment: [],
	actions: {
		getAllAssignmentForStudent: async (studentId, chapterId, keyword, skipCount, maxResultCount) : Promise<void> => {
			try{
				set({loading: true})
				let result = await assignmentService.getAllAssignmentForStudent(studentId, chapterId, keyword, skipCount, maxResultCount);
				set({
					listDetailAssignmentForAssignment: result.items || [],
					totalCountAssignment: result.totalCount
				})
			}finally{
				set({loading: false})
			}
		},
		updateAssignmentWithQuestions: async (body) : Promise<void> => {
			try {
				await assignmentService.updateAssignmentWithQuestions(body);
				} catch (error) {
					console.error("Error updating assignment with questions:", error);
				}
		},
		createAssignmentWithQuestions: async (body) : Promise<void> => {
			try {
				await assignmentService.createAssignmentWithQuestions(body);
			} catch (error) {
				console.error("Error creating assignment with questions:", error);
			}
		},
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
export const useDetailAssignmentForStudents = () => useAssignmentStore((state) => state.listDetailAssignmentForAssignment);
export const useAssignment = () => useAssignmentStore((state) => state.assignmentItem);
export const usetotalCountAssignment = () => useAssignmentStore((state) => state.totalCountAssignment);
export const useAssignmentLoading = () => useAssignmentStore((state) => state.loading);
export const useAssignmentActions = () => useAssignmentStore((state) => state.actions);
export default useAssignmentStore;