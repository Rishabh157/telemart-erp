export type ProductGroupListResponse = {
    companyId: string
    groupName: string
    gst: number
    dealerSalePrice: number
    sgst: number
    cgst: number
    igst: number
    utgst: number
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddProductGroup = {
    groupName: string
    dealerSalePrice: number
    companyId: string
    gst: number
    sgst: number
    cgst: number
    igst: number
    utgst: number
}

export type UpdateProductGroup = {
    body: {
        dealerSalePrice: number
        groupName: string
        gst: number
        sgst: number
        cgst: number
        igst: number
        utgst: number
        companyId: string
    }
    id: string
}
