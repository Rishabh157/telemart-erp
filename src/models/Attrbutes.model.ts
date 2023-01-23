export type AttributesListResponse = {
    attributeName: string;
    attributeType: string;
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

export type AddAttributes = {
    attributeName: string;
    attributeType: string;
    address: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateAttributes = {
    body: {
        attributeName: string;
    attributeType: string;
        address: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}