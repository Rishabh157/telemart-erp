export type VendorsListResponse = {
    vendorName: string;
    vendorCode: string;
    email: string;
    state : string;
    mobile: string;
    district: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddVendor = {
    vendorName: string;
    vendorCode: string;
    email: string;
    mobile: string;
    state : string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateVendor = {
    body: {
        vendorName: string;
        vendorCode: string;
        email: string;
        state : string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}