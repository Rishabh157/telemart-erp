export type AttributesGroupListResponse = {
    attribute: string;
    groupName: string;
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

export type AddAttributesGroup = {
    attribute: string;
    groupName: string;
    address: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateAttributesGroup = {
    body: {
        groupName: string;
    attribute: string;
        address: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}