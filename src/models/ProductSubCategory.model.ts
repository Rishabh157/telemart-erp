export type ProductSubCategoryListResponse = {
    subCategoryCode: string;
    parentCategory: string;
    subCategoryName: string;
    applicableTaxes: string;
    hsnCode: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddProductSubCategory = {
    subCategoryCode: string;
    parentCategory: string;
    subCategoryName: string;
    applicableTaxes: string;
    hsnCode: string;
    district: string;
    password: string;
    confirm_password: string;
}

export type UpdateProductSubCategory = {
    body: {
        subCategoryCode: string;
        parentCategory: string;
        subCategoryName: string;
        applicableTaxes: string;
        hsnCode: string;
        district: string;
        password: string;
        confirm_password: string;
    },
    id: string;
}