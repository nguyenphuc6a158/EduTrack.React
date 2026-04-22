import http from "src/services/httpService";
import { CreateStudentAssignmentDto, StudentAssignmentDto, StudentAssignmentService, UpdateStudentAssignmentDto } from "src/services/services_autogen";
import { create } from 'zustand';
const studentAssignmentService = new StudentAssignmentService('',http);

interface StudentAssignmentState {
    listStudentAssignmentes: StudentAssignmentDto[];
    studentAssignmentItem?: StudentAssignmentDto;
    totalCountStudentAssignment: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateStudentAssignmentDto) => Promise<void>;
        update: (body: UpdateStudentAssignmentDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<void>;
        checkExist: (studentId: number, assignmentId: number) => Promise<boolean>;
    };
}
const useStudentAssignmentStore = create<StudentAssignmentState>((set) => ({
    listStudentAssignmentes: [],
    totalCountStudentAssignment: 0,
    loading: false,
    studentAssignmentItem: undefined,
    actions: {
        checkExist: async (studentId: number, assignmentId: number) : Promise<boolean> =>{
            let existed: any = await studentAssignmentService.checkExist(studentId, assignmentId);
            return existed.result
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
        update: async (body) : Promise<void> => {
            await studentAssignmentService.update(body);
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