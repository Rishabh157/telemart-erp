export type SaleOrderListResponse = {
    soNumber: string;
    dealer: string;
    warehouse: string;
    mobile: string;
    district: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddSaleOrder = {
    soNumber: string;
    dealer: string;
    warehouse: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateSaleOrder = {
    body: {
        soNumber: string;
        dealer: string;
        warehouse: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}