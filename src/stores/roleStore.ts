import { create } from 'zustand';
import http from 'src/services/httpService';
import { CreateRoleDto, RoleDto, RoleService, PermissionDto } from 'src/services/services_autogen';

const roleService = new RoleService("", http);

interface RoleState {
    listRoles: any[]; // Using any for RoleListDto as it's returned by getRoles
    allPermissions: PermissionDto[];
    totalCountRole: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, sorting?: string , skipCount?: number, maxResultCount?: number) => Promise<void>;
        getAllPermissions: () => Promise<void>;
        create: (body: CreateRoleDto) => Promise<void>;
        update: (body: RoleDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
        getRoleForEdit: (id: number) => Promise<any>;
    };
}

const useRoleStore = create<RoleState>((set) => ({
    listRoles: [],
    allPermissions: [],
    totalCountRole: 0,
    loading: false,
    actions: {
        getAll: async (keyword, sorting, skipCount, maxResultCount) => {
            set({ loading: true });
            try {
                const result = await roleService.getAll(keyword, sorting, skipCount, maxResultCount);
                if (result) {
                    set({
                        listRoles: result.items || [],
                        totalCountRole: result.totalCount ?? result.items?.length ?? 0,
                    });
                }
            } finally {
                set({ loading: false });
            }
        },
        getAllPermissions: async () => {
            const result = await roleService.getAllPermissions();
            if (result) {
                set({ allPermissions: result.items || [] });
            }
        },
        create: async (body) => {
            await roleService.create(body);
        },
        update: async (body) => {
            await roleService.update(body);
        },
        delete: async (id) => {
            await roleService.delete(id);
            set((state) => ({
                listRoles: state.listRoles.filter((r) => r.id !== id),
                totalCountRole: state.totalCountRole - 1
            }));
        },
        getRoleForEdit: async (id) => {
            return await roleService.getRoleForEdit(id);
        }
    }
}));

export const useRoles = () => useRoleStore((state) => state.listRoles);
export const useRoleTotal = () => useRoleStore((state) => state.totalCountRole);
export const useRolePermissions = () => useRoleStore((state) => state.allPermissions);
export const useRoleLoading = () => useRoleStore((state) => state.loading);
export const useRoleActions = () => useRoleStore((state) => state.actions);

export default useRoleStore;
