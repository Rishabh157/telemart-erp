export type TaxesListResponse = {
    taxName: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddTaxes = {
    taxName:string
}

export type UpdateTaxes = {
    body: {
        taxName:string
    },
    id: string;
}