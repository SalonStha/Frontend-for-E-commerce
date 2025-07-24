export enum UserRoles {
    ADMIN = 'Admin',
    CUSTOMER = 'Customer',
    SELLER = 'Seller', 
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

export enum Status {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}

export const PaginationDefault = {
    page: 1,
    limit: 6,
    total: 0,
}

export interface IPagination {
    current: number;
    pageSize: number;
    total: number;
}
export interface IPaginationSearch {
    page?: number;
    limit?: number;
    search?: string | null;
}

