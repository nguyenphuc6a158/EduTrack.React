import http from "src/services/httpService";
import { CreateStudentAnswerDto, StudentAnswerDto, StudentAnswerService, UpdateStudentAnswerDto } from "src/services/services_autogen";
import { create } from 'zustand';
const studentAnswerService = new StudentAnswerService('',http);
interface StudentAnswerState {
    listStudentAnsweres: StudentAnswerDto[];
    studentAnswerItem?: StudentAnswerDto;
    totalCountStudentAnswer: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateStudentAnswerDto) => Promise<void>;
        update: (body: UpdateStudentAnswerDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<void>;
        checkExist: (body: CreateStudentAnswerDto) => Promise<boolean>;
    };
}
const useStudentAnswerStore = create<StudentAnswerState>((set) => ({
    listStudentAnsweres: [],
    totalCountStudentAnswer: 0,
    loading: false,
    studentAnswerItem: undefined,
    actions: {
        checkExist: async (body: CreateStudentAnswerDto) : Promise<boolean> =>{
            let existed: any = await studentAnswerService.checkExist(body);
            return existed.result
        },
        getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
            set({ loading: true });
            try{
                const result = await studentAnswerService.getAll(keyword, skipCount, maxResultCount);
                if(result){
                    set({
                        listStudentAnsweres: result.items || [],
                        totalCountStudentAnswer: result.items?.length  || 0
                    })
                }
            } finally {
                set({ loading: false });
            }
        },
        get : async (id) : Promise<void> => {
            set({ loading: true });
            try{
                const result = await studentAnswerService.get(id);
                if(result){
                    set({
                        studentAnswerItem: result
                    })
                }
            } finally {
                set({ loading: false });
            }
        },
        create : async (body) : Promise<void> => {
            await studentAnswerService.create(body);
        },
        update: async (body) : Promise<void> => {
            await studentAnswerService.update(body);
        },
        delete: async (id) : Promise<void> => {
            await studentAnswerService.delete(id);
        }
    }
}));

export const useStudentAnsweres = () => useStudentAnswerStore((state) => state.listStudentAnsweres);
export const useTotalCountStudentAnswer = () => useStudentAnswerStore((state) => state.totalCountStudentAnswer);
export const useStudentAnswer = () => useStudentAnswerStore((state) => state.studentAnswerItem);
export const useStudentAnswerLoading = () => useStudentAnswerStore((state) => state.loading);
export const useStudentAnswerActions = () => useStudentAnswerStore((state) => state.actions);
export default useStudentAnswerStore;