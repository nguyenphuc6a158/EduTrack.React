import { create } from 'zustand';
import http from 'src/services/httpService';
import { CreateTenantDto, TenantDto, TenantService } from 'src/services/services_autogen';

const tenantService = new TenantService("", http);

interface TenantState {
    listTenants: TenantDto[];
    totalCountTenant: number;
    loading: boolean;
    actions: {
        getAll: (keyword?: string, isActive?: boolean, sorting?: string, skipCount?: number, maxResultCount?: number) => Promise<void>;
        create: (body: CreateTenantDto) => Promise<void>;
        update: (body: TenantDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
    };
}

const useTenantStore = create<TenantState>((set) => ({
    listTenants: [],
    totalCountTenant: 0,
    loading: false,
    actions: {
        getAll: async (keyword, isActive, sorting, skipCount, maxResultCount) => {
            set({ loading: true });
            try {
                const result = await tenantService.getAll(keyword, isActive, sorting, skipCount, maxResultCount);
                if (result) {
                    set({ 
                        listTenants: result.items || [], 
                        totalCountTenant: result.totalCount || 0 
                    });
                }
            } finally {
                set({ loading: false });
            }
        },
        create: async (body) => {
            const result = await tenantService.create(body);
            if (result) {
                set((state) => ({
                    listTenants: [...state.listTenants, result],
                    totalCountTenant: state.totalCountTenant + 1
                }));
            }
        },
        update: async (body) => {
            const result = await tenantService.update(body);
            if (result) {
                set((state) => ({
                    listTenants: state.listTenants.map((t) => t.id === result.id ? result : t)
                }));
            }
        },
        delete: async (id) => {
            await tenantService.delete(id);
            set((state) => ({
                listTenants: state.listTenants.filter((t) => t.id !== id),
                totalCountTenant: state.totalCountTenant - 1
            }));
        }
    }
}));

export const useTenants = () => useTenantStore((state) => state.listTenants);
export const useTenantTotal = () => useTenantStore((state) => state.totalCountTenant);
export const useTenantLoading = () => useTenantStore((state) => state.loading);
export const useTenantActions = () => useTenantStore((state) => state.actions);

export default useTenantStore;
