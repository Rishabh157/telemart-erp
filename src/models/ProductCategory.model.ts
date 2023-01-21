export type ProductCategoryListResponse = {
    categoryCode: string;
    categoryName: string;
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

export type AddProductCategory = {
    categoryCode: string;
    categoryName: string;
    address: string;
    mobile: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateProductCategory = {
    body: {
        categoryCode: string;
    categoryName: string;
        address: string;
        mobile: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}