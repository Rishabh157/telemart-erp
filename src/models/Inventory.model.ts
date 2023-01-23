export type InventoryListResponse = {
    productName: string;
    quantity: string;
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

export type AddInventory = {
    productName: string;
    quantity: string;
    email: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateInventory = {
    body: {
        productName: string;
        quantity: string;
        email: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}