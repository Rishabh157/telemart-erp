export type ASRListResponse = {
    itemName: string;
    quantity: string;
    address: string;
    mobile: string;
    district: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddASR = {
    itemName: string;
    quantity: string;
    address: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateASR = {
    body: {
        quantity: string;
    itemName: string;
        address: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}