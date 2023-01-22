export type GRNListResponse = {
    poCode: string;
    itemName: string;
    receivingQuantity: string;
    goodQuantity: string;
    defectiveQuantity: string;
    weight: string;
    barcode: boolean;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddGRN = {
    itemImage: string;
    itemCode: string;
    itemName: string;
    barcode: boolean;
    category: string;
    subCategory: string;
    weight: string;
}

export type UpdateGRN = {
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