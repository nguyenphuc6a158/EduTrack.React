import http from 'src/services/httpService';
import { CreateSubjectDto, SubjectService, UpdateSubjectDto, type SubjectDto } from 'src/services/services_autogen';
import { create } from 'zustand';

const subjectService = new SubjectService("", http);
interface SubjectState {
	listSubjects: SubjectDto[],
	loading: boolean,
	totalCountSubject: number;
	actions: {
		getAll: (keyWord?: string, skipCount?: number, maxResultCount?: number) => Promise<void>,
		create: (body: CreateSubjectDto) => Promise<void>,
		update: (body: UpdateSubjectDto) => Promise<void>,
		delete: (id: number) => Promise<void>,
	}
}
const useSubjectStore = create<SubjectState>((set) => ({
	listSubjects: [],
	totalCountSubject: 0,
	loading: false,
	actions: {
		getAll: async (keyWord, skipCount, maxResultCount) => {
			set({loading: true});
			try{
				let result = await subjectService.getAll(keyWord, skipCount, maxResultCount)
				set({
					listSubjects: result.items,
					totalCountSubject: result.items?.length || 0,
				})
			} finally {
                set({ loading: false });
            }
		},
		create: async (body) => {
			await subjectService.create(body);
		},
		update: async (body) => {
            await subjectService.update(body);
        },
		delete: async (id) => {
            await subjectService.delete(id);
            set((state) => ({
                listSubjects: state.listSubjects.filter((r) => r.id !== id),
                totalCountSubject: state.totalCountSubject - 1
            }));
        },
	}
}))
export const useSubjects = () => useSubjectStore((sate)=>sate.listSubjects);
export const useTotalCountSubjectSubjects = () => useSubjectStore((sate)=>sate.totalCountSubject);
export const useSubjectLoading = () => useSubjectStore((sate)=>sate.loading);
export const useSubjectsActions = () => useSubjectStore((sate)=>sate.actions);

export default useSubjectStore;