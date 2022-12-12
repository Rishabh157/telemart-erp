export type UsersListResponse = {
    vendorName: string;
    vendorCode: string;
    email: string;
    mobile: string;
    district: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddUser = {
    vendorName: string;
    vendorCode: string;
    email: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateUser = {
    body: {
        vendorName: string;
        vendorCode: string;
        email: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}