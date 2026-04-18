import http from "src/services/httpService";
import { QuestionOptionDto, CreateQuestionOptionDto, QuestionOptionService, UpdateQuestionOptionDto } from "src/services/services_autogen";
import { create } from 'zustand';
const questionOptionService = new QuestionOptionService('',http);
interface QuestionOptionState {
	listQuestionOptions: QuestionOptionDto[];
	questionOptionItem?: QuestionOptionDto;
	totalCountQuestionOption: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		create: (body: CreateQuestionOptionDto) => Promise<void>;
		update: (body: UpdateQuestionOptionDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
		getAllByQuestionId: (questionId: number) => Promise<void>;
	};
}
const useQuestionOptionStore = create<QuestionOptionState>((set) => ({
	listQuestionOptions: [],
	totalCountQuestionOption: 0,
	loading: false,
	questionOptionItem: undefined,
	actions: {
		getAllByQuestionId: async(questionId: number) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionOptionService.getAllByQuestionId(questionId,undefined,undefined,undefined);
				if(result){
					set({
						listQuestionOptions: result.items || [],
						totalCountQuestionOption: result.totalCount  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionOptionService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listQuestionOptions: result.items || [],
						totalCountQuestionOption: result.totalCount  || 0
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await questionOptionService.get(id);
				if(result){
					set({
						questionOptionItem: result
					})
				}
			} finally {
				set({ loading: false });
			}
		},
		create : async (body) : Promise<void> => {
			await questionOptionService.create(body);
		},
		update: async (body) : Promise<void> => {
			await questionOptionService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await questionOptionService.delete(id);
		}
	}
}));

export const useQuestionOptions = () => useQuestionOptionStore((state) => state.listQuestionOptions);
export const useQuestionOption = () => useQuestionOptionStore((state) => state.questionOptionItem);
export const usetotalCountQuestionOption = () => useQuestionOptionStore((state) => state.totalCountQuestionOption);
export const useQuestionOptionLoading = () => useQuestionOptionStore((state) => state.loading);
export const useQuestionOptionActions = () => useQuestionOptionStore((state) => state.actions);
export default useQuestionOptionStore;