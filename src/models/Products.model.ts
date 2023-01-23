export type ProductsListResponse = {
    productName: string;
    productImage: string;
    productCode: string;
    category: string;
    subCategory: string;
    weight: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddProducts = {
    productName: string;
    productImage: string;
    productCode: string;
    category: string;
    subCategory: string;
    weight: string;
    password: string;
    confirm_password: string;
}

export type UpdateProducts = {
    body: {
        productName: string;
        productImage: string;
        productCode: string;
        category: string;
        subCategory: string;
        weight: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}