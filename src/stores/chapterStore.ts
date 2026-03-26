import http from "src/services/httpService";
import { ChapterDto, ChapterService, CreateChapterDto, UpdateChapterDto } from "src/services/services_autogen";
import { create } from 'zustand';
const chapterService = new ChapterService('',http);
interface ChapterState {
	listChapters: any[];
	chapterItem?: ChapterDto;
	totalCountChapter: number;
	loading: boolean;
	actions: {
		getAll: (keyword?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
		getChapterBySubject: (subjectID: number) => Promise<void>
		create: (body: CreateChapterDto) => Promise<void>;
		update: (body: UpdateChapterDto) => Promise<void>;
		delete: (id: number) => Promise<void>;
		get: (id: number) => Promise<void>;
	};
}
const useChapterStore = create<ChapterState>((set) => ({
	listChapters: [],
	totalCountChapter: 0,
	loading: false,
	chapterItem: undefined,
	actions: {
		getChapterBySubject: async (subjectID) => {
			set({loading: true})
			try{
				let result = await chapterService.getChapterBySubject(subjectID)
				set({
					listChapters:  result || []
				})
			} finally{
				set({loading: false})
			}
		},
		getAll : async (keyword, skipCount, maxResultCount) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await chapterService.getAll(keyword, skipCount, maxResultCount);
				if(result){
					set({
						listChapters: result.items || [],
						totalCountChapter: result.items?.length  || 0
					})
				}
			} finally {
                set({ loading: false });
            }
		},
		get : async (id) : Promise<void> => {
			set({ loading: true });
			try{
				const result = await chapterService.get(id);
				if(result){
					set({
						chapterItem: result
					})
				}
			} finally {
                set({ loading: false });
            }
		},
		create : async (body) : Promise<void> => {
			await chapterService.create(body);
		},
		update: async (body) : Promise<void> => {
			await chapterService.update(body);
		},
		delete: async (id) : Promise<void> => {
			await chapterService.delete(id);
		}
	}
}));

export const useChapters = () => useChapterStore((state) => state.listChapters);
export const useChapter = () => useChapterStore((state) => state.chapterItem);
export const useChapterLoading = () => useChapterStore((state) => state.loading);
export const useChapterActions = () => useChapterStore((state) => state.actions);
export default useChapterStore;