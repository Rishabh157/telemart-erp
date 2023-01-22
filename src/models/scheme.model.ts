export type SchemeListResponse = {
    schemeCode: string;
    schemeName: string;
    price: string;
    category: string;
    subCategory: string;
    weight: string;
    barcode: boolean;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddScheme = {
    itemImage: string;
    itemCode: string;
    itemName: string;
    barcode: boolean;
    category: string;
    subCategory: string;
    weight: string;
}

export type UpdateScheme = {
    body: {
        itemImage: string;
        itemCode: string;
        barcode: boolean;
        itemName: string;
        category: string;
        subCategory: string;
        weight: string;
    },
    id: string;
}