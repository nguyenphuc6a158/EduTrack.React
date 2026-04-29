import http from "src/services/httpService";
import { CreateListStudentAssignmentByListClassInput, CreateStudentAssignmentInput, DatailDoHomeWorkDto, StudentAssignmentDto, StudentAssignmentService, UpdateStudentAssignmentInput } from "src/services/services_autogen";
import { create } from 'zustand';
const studentAssignmentService = new StudentAssignmentService('',http);
interface StudentAssignmentState {
    listStudentAssignmentes: StudentAssignmentDto[];
    studentAssignmentItem?: StudentAssignmentDto;
    totalCountStudentAssignment: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateStudentAssignmentInput) => Promise<void>;
        update: (body: UpdateStudentAssignmentInput) => Promise<StudentAssignmentDto>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<void>;
        createListStudentAssignmentByListClass: (input: CreateListStudentAssignmentByListClassInput) => Promise<StudentAssignmentDto[]>;
        getStudentAssignmentByStudentIDAndAssignmentId: (useId: number, assignmentId: number) => Promise<StudentAssignmentDto>;
        getDetailDoHomeWorkDto: (useId: number) => Promise<DatailDoHomeWorkDto>;
    };
}
const useStudentAssignmentStore = create<StudentAssignmentState>((set) => ({
    listStudentAssignmentes: [],
    totalCountStudentAssignment: 0,
    loading: false,
    studentAssignmentItem: undefined,
    actions: {
        getDetailDoHomeWorkDto: async(useId: number) : Promise<DatailDoHomeWorkDto> =>{
            const result = await studentAssignmentService.getDetailDoHomeWorkDto(useId);
            return result;
        },
        getStudentAssignmentByStudentIDAndAssignmentId: async(useId: number, assignmentId: number) : Promise<StudentAssignmentDto> =>{
            return await studentAssignmentService.getStudentAssignmentByStudentIDAndAssignmentId(useId, assignmentId);
        },
        createListStudentAssignmentByListClass: async (input: CreateListStudentAssignmentByListClassInput) : Promise<StudentAssignmentDto[]> => {
            let result = await studentAssignmentService.createListStudentAssignmentByListClass(input);
            return result
        },
        getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
            set({ loading: true });
            try{
                const result = await studentAssignmentService.getAll(keyword, skipCount, maxResultCount);
                if(result){
                    set({
                        listStudentAssignmentes: result.items || [],
                        totalCountStudentAssignment: result.totalCount  || 0
                    })
                }
            } finally {
                set({ loading: false });
            }
        },
        get : async (id) : Promise<void> => {
            set({ loading: true });
            try{
                const result = await studentAssignmentService.get(id);
                if(result){
                    set({
                        studentAssignmentItem: result
                    })
                }
            } finally {
                set({ loading: false });
            }
        },
        create : async (body) : Promise<void> => {
            await studentAssignmentService.create(body);
        },
        update: async (body) : Promise<StudentAssignmentDto> => {
            const response = await studentAssignmentService.update(body);
            return response;
        },
        delete: async (id) : Promise<void> => {
            await studentAssignmentService.delete(id);
        }
    }
}));

export const useStudentAssignmentes = () => useStudentAssignmentStore((state) => state.listStudentAssignmentes);
export const useTotalCountStudentAssignment = () => useStudentAssignmentStore((state) => state.totalCountStudentAssignment);
export const useStudentAssignment = () => useStudentAssignmentStore((state) => state.studentAssignmentItem);
export const useStudentAssignmentLoading = () => useStudentAssignmentStore((state) => state.loading);
export const useStudentAssignmentActions = () => useStudentAssignmentStore((state) => state.actions);
export default useStudentAssignmentStore;