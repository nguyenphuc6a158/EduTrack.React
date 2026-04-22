import http from "src/services/httpService";
import { CreateAssignmentQuestionDto, AssignmentQuestionDto, AssignmentQuestionService, UpdateAssignmentQuestionDto } from "src/services/services_autogen";
import { create } from 'zustand';
const assignmentQuestionService = new AssignmentQuestionService('',http);
interface AssignmentQuestionState {
    listAssignmentQuestiones: AssignmentQuestionDto[];
    assignmentQuestionItem?: AssignmentQuestionDto;
    totalCountAssignmentQuestion: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateAssignmentQuestionDto) => Promise<void>;
        update: (body: UpdateAssignmentQuestionDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<void>;
        getAllAssignmentQuestionByAssignmentId: (assignmentId: number, userId: number) => Promise<number>;
    };
}
const useAssignmentQuestionStore = create<AssignmentQuestionState>((set) => ({
    listAssignmentQuestiones: [],
    totalCountAssignmentQuestion: 0,
    loading: false,
    assignmentQuestionItem: undefined,
    actions: {
        getAllAssignmentQuestionByAssignmentId : async (assignmentId: number, userId: number) => {
            set({ loading: true });
            try{
                const result = await assignmentQuestionService.getAllAssignmentQuestionByAssignmentId(assignmentId, userId, undefined, undefined, undefined);
                if(result){
                    set({
                        listAssignmentQuestiones: result.items || [],
                        totalCountAssignmentQuestion: result.totalCount  || 0
                    })
                    return result.totalCount || 0;
                }
            } finally {
                set({ loading: false });
            }
            return 0;
        },
        getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
            set({ loading: true });
            try{
                const result = await assignmentQuestionService.getAll(keyword, skipCount, maxResultCount);
                if(result){
                    set({
                        listAssignmentQuestiones: result.items || [],
                        totalCountAssignmentQuestion: result.totalCount  || 0
                    })
                }
            } finally {
                set({ loading: false });
            }
        },
        get : async (id) : Promise<void> => {
            set({ loading: true });
            try{
                const result = await assignmentQuestionService.get(id);
                if(result){
                    set({
                        assignmentQuestionItem: result
                    })
                }
            } finally {
                set({ loading: false });
            }
        },
        create : async (body) : Promise<void> => {
            await assignmentQuestionService.create(body);
        },
        update: async (body) : Promise<void> => {
            await assignmentQuestionService.update(body);
        },
        delete: async (id) : Promise<void> => {
            await assignmentQuestionService.delete(id);
        }
    }
}));

export const useAssignmentQuestiones = () => useAssignmentQuestionStore((state) => state.listAssignmentQuestiones);
export const useTotalCountAssignmentQuestion = () => useAssignmentQuestionStore((state) => state.totalCountAssignmentQuestion);
export const useAssignmentQuestion = () => useAssignmentQuestionStore((state) => state.assignmentQuestionItem);
export const useAssignmentQuestionLoading = () => useAssignmentQuestionStore((state) => state.loading);
export const useAssignmentQuestionActions = () => useAssignmentQuestionStore((state) => state.actions);
export default useAssignmentQuestionStore;