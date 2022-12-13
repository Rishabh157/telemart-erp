export type DealersListResponse = {
    dealerName: string;
    dealerCode: string;
    mobile: string;
    district: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddDealer = {
    dealerName: string;
    dealerCode: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateDealer = {
    body: {
        dealerName: string;
        dealerCode: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}