import { create } from 'zustand';
import http from 'src/services/httpService';
import { CreateUserDto, Int64EntityDto, ResetPasswordDto, RoleDto, UserDto, UserService } from 'src/services/services_autogen';

const userService = new UserService("", http);

interface UserState {
    listUsers: UserDto[];
    totalCountUser: number;
    loading: boolean;
    listRoles: RoleDto[];
    actions: {
        getRoles: () => Promise<void>;
        getAll: (keyword?: string, isActive?: boolean, sorting?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateUserDto) => Promise<void>;
        update: (body: UserDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
        resetPassword: (body?: ResetPasswordDto) => Promise<void>;
    };
}

const useUserStore = create<UserState>((set) => ({
    listUsers: [],
    listRoles: [],
    totalCountUser: 0,
    loading: false,
    actions: {
        getRoles : async () => { 
            set({ loading: true });
            try {
                const result = await userService.getRoles();
                if (result) {
                    set({
                        listRoles: result.items || [],
                    });
                } 
            } finally {
                set({ loading: false });
            }
        },
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
        resetPassword: async (body) => {
            await userService.resetPassword(body);
        }
    }
}));

export const useUsers = () => useUserStore((state) => state.listUsers);
export const useRolesFromUser = () => useUserStore((state) => state.listRoles);
export const useUserTotal = () => useUserStore((state) => state.totalCountUser);
export const useUserLoading = () => useUserStore((state) => state.loading);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;