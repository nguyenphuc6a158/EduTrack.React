import { create } from 'zustand';
import http from 'src/services/httpService';
import { DashBoardDto, DashBoardService } from 'src/services/services_autogen';

const dashBoardService = new DashBoardService("", http);

interface DashboardState {
	detailDashboard: DashBoardDto;
	loading: boolean;
	actions: {
		getDetailDashBoard: () => Promise<void>;
	};
}

const useDashboardStore = create<DashboardState>((set) => ({
	detailDashboard: new DashBoardDto({
		countTeachers: 0,
		countStudents: 0,
		countRoles: 0,
		countClasses: 0,
		totalUsers: 0,
		usersGroupByDate: [],
		usersGroupByRole: [],
	}),
	loading: false,
	actions: {
		getDetailDashBoard: async () => {
			set({ loading: true });
			try {
				const result = await dashBoardService.getDetailDashBoard();
				if (result) {
					set({
						detailDashboard: result,
					});
				}
			} finally {
				set({ loading: false });
			}
		},
	},
}));

export const useDetailDashboard = () => useDashboardStore((state) => state.detailDashboard);
export const useDashboardLoading = () => useDashboardStore((state) => state.loading);
export const useDashBoardActions = () => useDashboardStore((state) => state.actions);

export default useDashboardStore;
