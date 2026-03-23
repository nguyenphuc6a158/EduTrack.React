import { create } from 'zustand';
import http from 'src/services/httpService';
import { GetCurrentLoginInformationsOutput, SessionService } from 'src/services/services_autogen';

const sessionService = new SessionService("", http);

interface SessionState {
    currentLogin: GetCurrentLoginInformationsOutput | null;
    loading: boolean;
    actions: {
        getCurrentLoginInformations: () => Promise<void>;
    };
}

const useSessionStore = create<SessionState>((set) => ({
    currentLogin: null,
    loading: false,
    actions: {
        getCurrentLoginInformations: async () => {
            set({ loading: true });
            try {
                const result = await sessionService.getCurrentLoginInformations();
                if (result) {
                    set({ currentLogin: result });
                }
            } finally {
                set({ loading: false });
            }
        },
    }
}));

export const useCurrentLogin = () => useSessionStore((state) => state.currentLogin);
export const useSessionLoading = () => useSessionStore((state) => state.loading);
export const useSessionActions = () => useSessionStore((state) => state.actions);

export default useSessionStore;
