export type TaxesListResponse = {
    tax: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddTaxes = {
    tax:string
}

export type UpdateTaxes = {
    body: {
        tax:string
    },
    id: string;
}