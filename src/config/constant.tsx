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

export enum TransactionStatus  {
    PAID= "true",
    NOT_PAID= "false",

}
export enum PaymentMethod {
    CASH_ON_DELIVERY = "Cash on Delivery",
    KHALTI = "Khalti",
    ESEWA = "Esewa",
    FONEPAY = "Fonepay",
    BANK = "Bank",
}

export enum OrderStatus  {
    PENDING= "Pending",
    PROCESSING= "Processing",
    COMPLETED= "Completed",
    CANCELLED= "Cancelled",
    SHIPPED= "Shipped",
    DELIVERED= "Delivered"
};

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

