// |-- Types --|
export type SchemeListResponse = {
    schemeCode: string
    schemeName: string
    category: string
    subCategory: string
    schemePrice: number
    dimension: dimension
    weight: number
    deliveryCharges: number
    comboPacking: boolean
    startDate: string
    endDate: string
    schemeDescription: string
    productInformation: productInformation[]
    productCategoryLabel: string
    ProductSubCategoryLabel: String
    commission: number
    faq: faq[]
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type productInformation = {
    productGroup: string
    productQuantity: number
    mrp: number
    pop: number
}

export type faq = {
    question: string
    answer: string
}

export type dimension = {
    height: number
    width: number
    depth: number
}

export type AddSchemes = {
    // schemeCode: string
    schemeName: string
    category: string
    subCategory: string
    schemePrice: number
    dimension: dimension
    weight: number
    deliveryCharges: number
    comboPacking: boolean
    startDate: string
    endDate: string
    schemeDescription: string
    productInformation: productInformation[]
    faq: faq[]
    commission: number
    companyId: string
}

export type UpdateScheme = {
    body: {
        // schemeCode: string
        schemeName: string
        category: string
        subCategory: string
        schemePrice: number
        dimension: dimension
        weight: number
        deliveryCharges: number
        comboPacking: boolean
        startDate: string
        endDate: string
        schemeDescription: string
        productInformation: productInformation[]
        faq: faq[]
        commission: number
        companyId: string
    }
    id: string
}
