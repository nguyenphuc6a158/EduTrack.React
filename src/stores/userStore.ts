import { create } from 'zustand';
import http from 'src/services/httpService';
import { CreateUserDto, Int64EntityDto, UserDto, UserService } from 'src/services/services_autogen';

const userService = new UserService("", http);

interface UserState {
    listUsers: UserDto[];
    totalCountUser: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, isActive?: boolean, sorting?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateUserDto) => Promise<void>;
        update: (body: UserDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
    };
}

const useUserStore = create<UserState>((set) => ({
    listUsers: [],
    totalCountUser: 0,
    loading: false,
    actions: {
        getAll: async (keyword, isActive, sorting, skipCount, maxResultCount) => {
            set({ loading: true });
            try {
                const result = await userService.getAll(keyword, isActive, sorting, skipCount, maxResultCount);
                if (result) {
                    set({
                        listUsers: result.items || [],
                        totalCountUser: result.totalCount || 0
                    });
                }
            } finally {
                set({ loading: false });
            }
        },
        create: async (body) => {
            const result = await userService.create(body);
            if (result) {
                set((state) => ({
                    listUsers: [...state.listUsers, result],
                    totalCountUser: state.totalCountUser + 1
                }));
            }
        },
        update: async (body) => {
            const result = await userService.update(body);
            if (result) {
                set((state) => ({
                    listUsers: state.listUsers.map((u) => u.id === result.id ? result : u)
                }));
            }
        },
        delete: async (id) => {
            await userService.delete(id);
            set((state) => ({
                listUsers: state.listUsers.filter((u) => u.id !== id),
                totalCountUser: state.totalCountUser - 1
            }));
        },
    }
}));

export const useUsers = () => useUserStore((state) => state.listUsers);
export const useUserTotal = () => useUserStore((state) => state.totalCountUser);
export const useUserLoading = () => useUserStore((state) => state.loading);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;