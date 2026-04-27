import http from "src/services/httpService";
import { CreateQuestionDto, CreateQuestionWithOptionsDto, QuestionDto, QuestionService, UpdateQuestionDto, UpdateQuestionWithOptionsDto } from "src/services/services_autogen";
import { create } from 'zustand';
const questionService = new QuestionService('',http);
interface QuestionState {
	listQuestions: QuestionDto[];
	questionItem?: QuestionDto;
	totalCountQuestion: number;
	loading: boolean;
	listQuestionsByAssignment: QuestionDto[];
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateQuestionDto) => Promise<QuestionDto>;
		update: (body: UpdateQuestionDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
		getQuestionByChapter: (chapterId: number) => Promise<void>;
		createWithOptions: (body?: CreateQuestionWithOptionsDto) => Promise<void>;
		updateWithOptions: (body?: UpdateQuestionWithOptionsDto) => Promise<void>;
		getAllQuestionByAssignment: (assignmentId: number) => Promise<void>;
		getQuestionByAssignmentIdAndOrderIndex:(assignmentId: number, orderIndex: number) => Promise<void>;
	};
}
const useQuestionStore = create<QuestionState>((set) => ({
	listQuestions: [],
	listQuestionsByAssignment: [],
	totalCountQuestion: 0,
	loading: false,
	questionItem: undefined,
	actions: {
		getQuestionByAssignmentIdAndOrderIndex: async (assignmentId: number, orderIndex: number) =>{
			set({ loading: true });
			try{
				const result = await questionService.getQuestionByAssignmentIdAndOrderIndex(assignmentId, orderIndex);
				if(result!=undefined){
					set({questionItem: result})
				}
			} finally {
				set({ loading: false });
			}
		},
		getAllQuestionByAssignment : async (assignmentId: number) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionService.getAllQuestionByAssignment(assignmentId);
				if(result){
					set({
						listQuestionsByAssignment: result.items || [],
						totalCountQuestion: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		updateWithOptions: async (body) => {
			set({ loading: true });
			try{
				await questionService.updateWithOptions(body);
			}finally {
				set({ loading: false });
			}
		},
		createWithOptions: async (body) => {
			set({ loading: true });
			try{
				await questionService.createWithOptions(body);
			}finally {
				set({ loading: false });
			}
		},
		getQuestionByChapter : async (chapterId: number) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionService.getQuestionByChapter(chapterId);
				if(result){
					set({
						listQuestions: result.items || [],
						totalCountQuestion: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listQuestions: result.items || [],
						totalCountQuestion: result.items?.length  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionService.get(id);
				if(result){
					set({
						questionItem: result
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		create : async (body) : Promise<QuestionDto> => {
			return await questionService.create(body);
		},
		update: async (body) : Promise<void> => {
			await questionService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await questionService.delete(id);
		}
	}
}));

export const useQuestions = () => useQuestionStore((state) => state.listQuestions);
export const useQuestionsByAssignment = () => useQuestionStore((state) => state.listQuestionsByAssignment);
export const useTotalCountQuestion = () => useQuestionStore((state) => state.totalCountQuestion);
export const useQuestion = () => useQuestionStore((state) => state.questionItem);
export const useQuestionLoading = () => useQuestionStore((state) => state.loading);
export const useQuestionActions = () => useQuestionStore((state) => state.actions);
export default useQuestionStore;